import {config} from '../config/config';
import {isStocksDashUpdateTime} from '../core/dashResetTimes';
import {DashService} from '../core/DashService';
import {Rank} from '../core/models/rank';
import {sleep} from '../core/models/utils';
import {cryptoDataToCryptoPricingData, logIfError, stocksAndETFsDataToStocksAndETFsPricingData} from '../core/utils';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {RanksRepository} from '../integration/db/repositories/RanksRepository';
import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {IexCloudService} from '../integration/http/IexCloudService';
import {Logger} from '../core/Logger';

export class PricingDataUpdater {
  get running(): boolean {
    return this._running;
  }

  set running(value: boolean) {
    this._running = value;
  }

  private iexCloudService: IexCloudService;

  private coinmarketCapService: CoinmarketCapService;
  private assetRepository: AssetRepository;
  private _running: boolean;
  private ranksRepository: RanksRepository;
  private dashService: DashService;
  private logger: Logger;

  constructor(
    iexCloudService: IexCloudService,
    coinmarketCapService: CoinmarketCapService,
    assetRepository: AssetRepository,
    ranksRepository: RanksRepository,
    dashService: DashService,
    logger: Logger
  ) {
    this.iexCloudService = iexCloudService;
    this.coinmarketCapService = coinmarketCapService;
    this.assetRepository = assetRepository;
    this.ranksRepository = ranksRepository;
    this.dashService = dashService;
    this._running = true;
    this.logger = logger;
  }

  start = () => {
    this._running = true;
  }

  stop = () => {
    this._running = false;
  }

  loop = async (cryptoTickers: string[], stocksAndETFsTickers: string[]) => {
    while (this._running) {
      this.logger.logStatus('Start of loop');
      const now = new Date();
      this.logger.logStatus('Updating prices ...');
      await logIfError(this.updateCryptoAssetPrices(cryptoTickers), this.logger);
      this.logger.logStatus(`Prices updated for ${cryptoTickers.length} / ${cryptoTickers.length} cryptocurrencies`);
      await logIfError(this.updateStocksAndETFsAssetPrices(stocksAndETFsTickers), this.logger);
      this.logger.logStatus('Updating ranks ...');
      await logIfError(this.updateRanksForAssets(now), this.logger);
      this.logger.logStatus('Updating dash ...');
      await logIfError(this.updateDash(now), this.logger);
      this.logger.logStatus('End of updating');
      this.logger.logStatus('Sleeping time...');
      await sleep(config.priceUpdateTime);
      this.logger.logStatus('End of loop');
    }
  }

  updateCryptoAssetPrices = async (cryptoTickers: string[]) => {
    const cryptoAssets = (await this.coinmarketCapService.getAssetsData(cryptoTickers))['data'];
    for (const cryptoAsset in cryptoAssets) {
      const pricingData = await cryptoDataToCryptoPricingData(cryptoAssets[cryptoAsset]);
      await this.assetRepository.updatePrice(pricingData);
    }
  }

  updateStocksAndETFsAssetPrices = async (stocksAndETFsTickers: string[]) => {
    const stocksAndETFsAssets = await this.iexCloudService.getAssetsData(stocksAndETFsTickers, this.logger);
    for (const stocksAndETFsAsset in stocksAndETFsAssets) {
      const pricingData = await stocksAndETFsDataToStocksAndETFsPricingData(stocksAndETFsAssets[stocksAndETFsAsset]);
      await this.assetRepository.updatePrice(pricingData);
    }
  }

  updateRanksForAssets = async (date: Date) => {
    const allAssets = await this.assetRepository.findAll();
    for (let index = 0; index < allAssets.length; index++) {
      const asset = allAssets[index];
      const rank: Rank = {
        assetId: asset.id,
        position: index + 1,
        date: date
      };
      await this.ranksRepository.updateRank(rank);
    }
  }

  updateDash = async (now: Date) => {
    const allAssets = await this.assetRepository.findAll();
    for (const asset of allAssets) {
      const dashDaily = await this.dashService.dailyDash(now, asset.id);
      const dashWeekly = await this.dashService.weeklyDash(now, asset.id);
      const dashMonthly = await this.dashService.monthlyDash(now, asset.id);
      if (isStocksDashUpdateTime(now) || asset.type === 'Cryptocurrency') {
        await this.assetRepository.updateDash(asset.id, dashDaily, dashWeekly, dashMonthly);
      }
    }
  }
}
