import {parseISO} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';
import {AssetPricingData} from './models/assetPricingData';

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
    type: ['Cryptocurrency'],
    lastUpdated: new Date(assetData['last_updated'])
  };
}

export function stocksAndETFsDataToStocksAndETFsPricingData(assetData: object): AssetPricingData {
  return {
    ticker: assetData['quote']['symbol'],
    price: assetData['quote']['latestPrice'],
    marketcap: assetData['quote']['marketCap'],
    change: assetData['quote']['changePercent'] * 100,
    type: ['Stock', 'ETF'],
    lastUpdated: new Date(assetData['quote']['latestUpdate'])
  };
}

export const parseAsEstDate = (isoDateString: string) => zonedTimeToUtc(parseISO(isoDateString), 'America/New_York');
export const estDate = (isoDate: Date) => zonedTimeToUtc(isoDate, 'America/New_York');
