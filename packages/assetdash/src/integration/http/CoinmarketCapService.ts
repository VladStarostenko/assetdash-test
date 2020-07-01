import {http, HttpFunction} from './utils';
import {config} from '../../config/config';
import fetch from 'node-fetch';

export class CoinmarketCapService {
  private readonly fetch: HttpFunction;

  constructor() {
    this.fetch = http(fetch)(config.coinmarketCapBaseUrl);
  }

  async getCoinsQuotes(tickers: string[]): Promise<string> {
    try {
      return await this.fetch(this.getPath(tickers));
    } catch (err) {
      throw new Error(err);
    }
  }

  getPath(tickers: string[]) {
    const {coinmarketCapKey} = config;
    const tickersAsString = tickers.join(',');
    return `/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${coinmarketCapKey}&symbol=${tickersAsString}`;
  }
}
