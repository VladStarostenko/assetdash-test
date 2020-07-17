import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {cryptoDataToCryptoPricingData, stocksAndETFsDataToStocksAndETFsPricingData} from '../core/utils';
import {config} from '../config/config';
import {sleep} from '../core/models/utils';
import {IexCloudService} from '../integration/http/IexCloudService';
import {RanksRepository} from '../integration/db/repositories/RanksRepository';
import {Rank} from '../core/models/rank';

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
  private _todayDate: Date;

  constructor(
    iexCloudService: IexCloudService,
    coinmarketCapService: CoinmarketCapService,
    assetRepository: AssetRepository,
    ranksRepository: RanksRepository
  ) {
    this.iexCloudService = iexCloudService;
    this.coinmarketCapService = coinmarketCapService;
    this.assetRepository = assetRepository;
    this.ranksRepository = ranksRepository;
    this._running = true;
    this._todayDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
  }

  start = () => {
    this._running = true;
  }

  stop = () => {
    this._running = false;
  }

  setTodayDate = () => {
    this._todayDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
  }

  loop = async (cryptoTickers: string[], stocksAndETFsTickers: string[]) => {
    while (this._running) {
      await this.updateCryptoAssetPrices(cryptoTickers);
      await this.updateStocksAndETFsAssetPrices(stocksAndETFsTickers);
      await this.updateRanksForAssets();
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
    const date = new Date(new Date().setUTCHours(0, 0, 0, 0));
    allAssets.forEach((asset, index) => {
      const rank: Rank = {
        assetId: asset.id,
        position: index + 1,
        date: date
      };
      if (date === this._todayDate) {
        this.ranksRepository.updateRank(rank);
      } else {
        this.ranksRepository.insertRank(rank);
      }
    });
    this._todayDate = date;
  }
}
