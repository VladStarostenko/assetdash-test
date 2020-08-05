import {http, HttpFunction} from './utils';
import {config} from '../../config/config';
import fetch from 'node-fetch';
import {Logger} from '../../core/Logger';

export class IexCloudService {
  private readonly fetch: HttpFunction;
  private readonly batchSize: number;

  constructor(iexCloudBaseUrl: string, batchSize = 100) {
    this.fetch = http(fetch)(iexCloudBaseUrl);
    this.batchSize = batchSize;
  }

  async getAssetsData(tickers: string[], logger: Logger): Promise<object> {
    try {
      let result = {};
      let counter = 0;
      for (let i = 0; i < tickers.length; i += this.batchSize) {
        logger.logStatus(`Prices updated for ${counter} / ${tickers.length} stocks and ETFs`);
        const tickersBatch = tickers.slice(i, i + this.batchSize);
        const batchResponse = await this.fetch(this.getPath(tickersBatch));
        result = Object.assign(result, batchResponse);
        counter += this.batchSize;
      }
      logger.logStatus(`Prices updated for ${tickers.length} / ${tickers.length} stocks and ETFs`);
      return result;
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
