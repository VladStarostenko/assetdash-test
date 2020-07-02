import {AssetPricingData} from './models/assetPricingData';

interface ErrorConstructor<T extends any[]> {
  new (...args: T): Error;
}

export function ensure<T extends any[]>(condition: boolean, ErrorToThrow: ErrorConstructor<T>, ...errorArgs: T):
  asserts condition {
  if (!condition) {
    throw new ErrorToThrow(...errorArgs);
  }
}

export function convertAssetDataToAssetPricingData(assetData: object): AssetPricingData {
  return {
    ticker: assetData['symbol'],
    price: assetData['quote']['USD']['price'],
    marketcap: assetData['quote']['USD']['market_cap']
  };
}
