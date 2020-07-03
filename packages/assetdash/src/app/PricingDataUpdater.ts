import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {convertAssetDataToAssetPricingData} from '../core/utils';
import {config} from '../config/config';
import {sleep} from '../core/models/utils';

export class PricingDataUpdater {
  get running(): boolean {
    return this._running;
  }

  set running(value: boolean) {
    this._running = value;
  }

  private coinmarketCapService: CoinmarketCapService;
  private assetRepository: AssetRepository;
  private _running: boolean;

  constructor(coinmarketCapService: CoinmarketCapService, assetRepository: AssetRepository) {
    this.coinmarketCapService = coinmarketCapService;
    this.assetRepository = assetRepository;
    this._running = true;
  }

  start = () => {
    this._running = true;
  }

  stop = () => {
    this._running = false;
  }

  loop = async (tickers: string[]) => {
    while (this._running) {
      await sleep(config.priceUpdateTime);
      await this.updateAssetPrices(tickers);
    }
  }

  updateAssetPrices = async (tickers: string[]) => {
    const assets = (await this.coinmarketCapService.getAssetsData(tickers))['data'];
    for (const asset in assets) {
      const pricingData = await convertAssetDataToAssetPricingData(assets[asset]);
      await this.assetRepository.updatePrice(pricingData);
    }
  }
}
