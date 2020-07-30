import {AssetPricingData} from './models/assetPricingData';
import {DateTime} from 'luxon';

interface ErrorConstructor<T extends any[]> {
  new (...args: T): Error;
}

export async function logIfError(promise: Promise<void>) {
  try {
    await promise;
  } catch (e) {
    console.error(e);
  }
}

export function ensure<T extends any[]>(condition: boolean, ErrorToThrow: ErrorConstructor<T>, ...errorArgs: T):
  asserts condition {
  if (!condition) {
    throw new ErrorToThrow(...errorArgs);
  }
}

export function cryptoDataToCryptoPricingData(assetData: object): AssetPricingData {
  return {
    ticker: assetData['symbol'],
    price: assetData['quote']['USD']['price'],
    marketcap: assetData['quote']['USD']['market_cap'],
    change: assetData['quote']['USD']['percent_change_24h'],
    type: ['Cryptocurrency']
  };
}

export function stocksAndETFsDataToStocksAndETFsPricingData(assetData: object): AssetPricingData {
  return {
    ticker: assetData['quote']['symbol'],
    price: assetData['quote']['latestPrice'],
    marketcap: assetData['quote']['marketCap'],
    change: assetData['quote']['changePercent'] * 100,
    type: ['Stock', 'ETF']
  };
}

export const parseAsEstDate = (isoDateString: string) => {
  return DateTime.fromSQL(isoDateString, {zone: 'America/New_York'}).toUTC().toBSON();
};
