import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {cryptoDataToCryptoPricingData, logIfError, stocksAndETFsDataToStocksAndETFsPricingData} from '../core/utils';
import {config} from '../config/config';
import {sleep} from '../core/models/utils';
import {IexCloudService} from '../integration/http/IexCloudService';
import {RanksRepository} from '../integration/db/repositories/RanksRepository';
import {Rank} from '../core/models/rank';
import {startOfToday} from 'date-fns';
import {DashService} from '../core/DashService';

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

  constructor(
    iexCloudService: IexCloudService,
    coinmarketCapService: CoinmarketCapService,
    assetRepository: AssetRepository,
    ranksRepository: RanksRepository,
    dashService: DashService
  ) {
    this.iexCloudService = iexCloudService;
    this.coinmarketCapService = coinmarketCapService;
    this.assetRepository = assetRepository;
    this.ranksRepository = ranksRepository;
    this.dashService = dashService;
    this._running = true;
  }

  start = () => {
    this._running = true;
  }

  stop = () => {
    this._running = false;
  }

  loop = async (cryptoTickers: string[], stocksAndETFsTickers: string[]) => {
    while (this._running) {
      const now = startOfToday();
      await logIfError(this.updateCryptoAssetPrices(cryptoTickers));
      await logIfError(this.updateStocksAndETFsAssetPrices(stocksAndETFsTickers));
      await logIfError(this.updateRanksForAssets());
      await logIfError(this.updateDash(now));
      await sleep(config.priceUpdateTime);
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
    const stocksAndETFsAssets = await this.iexCloudService.getAssetsData(stocksAndETFsTickers);
    for (const stocksAndETFsAsset in stocksAndETFsAssets) {
      const pricingData = await stocksAndETFsDataToStocksAndETFsPricingData(stocksAndETFsAssets[stocksAndETFsAsset]);
      await this.assetRepository.updatePrice(pricingData);
    }
  }

  updateRanksForAssets = async () => {
    const allAssets = await this.assetRepository.findAll();
    for (let index = 0; index < allAssets.length; index++) {
      const asset = allAssets[index];
      // console.log(`${asset.id}: ${asset.ticker} - ${asset.currentMarketcap}- ${asset.lastUpdated}`);
      const rank: Rank = {
        assetId: asset.id,
        position: index + 1,
        date: asset.lastUpdated || new Date()
      };
      await this.ranksRepository.updateRank(rank);
    }
  }

  updateDash = async (now: Date) => {
    const allAssets = await this.assetRepository.findAll();
    for (let index = 0; index < allAssets.length; index++) {
      const dashDaily = await this.dashService.dailyDash(now, allAssets[index].id);
      const dashWeekly = await this.dashService.weeklyDash(now, allAssets[index].id);
      const dashMonthly = await this.dashService.monthlyDash(now, allAssets[index].id);
      await this.assetRepository.updateDash(allAssets[index].id, dashDaily, dashWeekly, dashMonthly);
    }
  }
}
