import {Asset} from '../../src/core/models/asset';
import {AssetType} from '../../src/core/models/assetType';
import {Rank} from '../../src/core/models/rank';

let lastId = 0;

import {RanksRepository} from '../../src/integration/db/repositories/RanksRepository';

export function assetWithId(id: number): Asset {
  return {id, imageUrl: '', name: 'Bitcoin', ticker: 'BTC', type: 'Cryptocurrency'};
}

export function anAsset({
  ticker = '',
  name = '',
  assetType = 'Cryptocurrency' as AssetType
} = {}): Asset {
  return {
    id: lastId++, imageUrl: '', name, ticker, type: assetType
  };
}

export const insertRanks = (ranksRepository: RanksRepository) => async (ranks: Rank[]) => {
  for (const rank of ranks) {
    await ranksRepository.updateRank(rank);
  }
};
export const DEFAULT_LAST_UPDATED = new Date('2020-01-01T00:00:00.000Z');

export const stockAssetData = {
  quote: {
    symbol: 'AAPL',
    companyName: 'Apple, Inc.',
    primaryExchange: 'NASDAQ',
    calculationPrice: 'close',
    open: 376.92,
    openTime: 1594215001279,
    openSource: 'official',
    close: 381.37,
    closeTime: 1594238400513,
    closeSource: 'official',
    high: 381.5,
    highTime: 1594252797606,
    highSource: '15 minute delayed price',
    low: 376.36,
    lowTime: 1594215002123,
    lowSource: '15 minute delayed price',
    latestPrice: 381.37,
    latestSource: 'Close',
    latestTime: 'July 8, 2020',
    latestUpdate: 1594238400513,
    latestVolume: 29104452,
    iexRealtimePrice: null,
    iexRealtimeSize: null,
    iexLastUpdated: null,
    delayedPrice: 383.18,
    delayedPriceTime: 1594284321673,
    oddLotDelayedPrice: 381.346,
    oddLotDelayedPriceTime: 1594238396279,
    extendedPrice: null,
    extendedChange: null,
    extendedChangePercent: null,
    extendedPriceTime: null,
    previousClose: 372.69,
    previousVolume: 28106114,
    change: 8.68,
    changePercent: 0.02329,
    volume: 0,
    iexMarketPercent: null,
    iexVolume: null,
    avgTotalVolume: 35140782,
    iexBidPrice: null,
    iexBidSize: null,
    iexAskPrice: null,
    iexAskSize: null,
    iexOpen: null,
    iexOpenTime: null,
    iexClose: 381.3,
    iexCloseTime: 1594238399527,
    marketCap: 1652987245800,
    peRatio: 29.65,
    week52High: 381.5,
    week52Low: 192.58,
    ytdChange: 0.29304199999999997,
    lastTradeTime: 1594238400000,
    isUSMarketOpen: false
  }
};

export const cryptoAssetData = {
  id: 1027,
  name: 'Ethereum',
  symbol: 'ETH',
  slug: 'ethereum',
  num_market_pairs: 5071,
  date_added: '2015-08-07T00:00:00.000Z',
  tags: [
    'crowdfunding',
    'pow',
    'medium-of-exchange',
    'mineable',
    'smart-contracts',
    'ethash'
  ],
  max_supply: null,
  circulating_supply: 111686005.5615,
  total_supply: 111686005.5615,
  is_active: 1,
  platform: null,
  cmc_rank: 2,
  is_fiat: 0,
  last_updated: '2020-07-09T13:03:30.000Z',
  quote: {
    USD: {
      price: 246.853296483,
      volume_24h: 9333879191.07375,
      percent_change_1h: 0.28939,
      percent_change_24h: 1.36279,
      percent_change_7d: 7.82757,
      market_cap: 27570058643.874947,
      last_updated: '2020-07-09T13:03:30.000Z'
    }
  }
};
