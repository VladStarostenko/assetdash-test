import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {convertAssetDataToAssetPricingData} from '../core/utils';

export class PricingDataUpdater {
  private coinmarketCapService: CoinmarketCapService;
  private assetRepository: AssetRepository;

  constructor(coinmarketCapService: CoinmarketCapService, assetRepository: AssetRepository) {
    this.coinmarketCapService = coinmarketCapService;
    this.assetRepository = assetRepository;
  }

  updateAssetPrices = async (tickers: string[]) => {
    const assets = (await this.coinmarketCapService.getAssetsData(tickers))['data'];
    for (const asset in assets) {
      const pricingData = await convertAssetDataToAssetPricingData(assets[asset]);
      await this.assetRepository.updatePrice(pricingData);
    }
  }
}
