import {http, HttpFunction} from './utils';
import {config} from '../../config/config';
import fetch from 'node-fetch';

export class IexCloudService {
  private readonly fetch: HttpFunction;

  constructor() {
    this.fetch = http(fetch)(config.iexCloudBaseUrl);
  }

  async getAssetsData(tickers: string[]): Promise<object> {
    try {
      let tempArray: string[];
      let resp = {};
      for (let i = 0; i < tickers.length; i += 100) {
        tempArray = tickers.slice(i, i + 100);
        const tempResp = await this.fetch(this.getPath(tempArray));
        resp = Object.assign(resp, tempResp);
      }
      return resp;
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
