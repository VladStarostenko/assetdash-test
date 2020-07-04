import {http, HttpFunction} from './utils';
import {config} from '../../config/config';
import fetch from 'node-fetch';

export class IexCloudService {
  private readonly fetch: HttpFunction;

  constructor() {
    this.fetch = http(fetch)(config.coinmarketCapBaseUrl);
  }

  async getAssetsData(tickers: string[]): Promise<object> {
    try {
      return await this.fetch(this.getPath(tickers));
    } catch (err) {
      throw new Error(err);
    }
  }

  getPath(tickers: string[]) {
    const {iexCloudKey} = config;
    const tickersAsString = tickers.join(',');
    return `/stable/stock/market/batch?symbols=${tickersAsString}&types=quote&token=${iexCloudKey}`;
  }
}
