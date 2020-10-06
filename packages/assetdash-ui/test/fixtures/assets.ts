export const exampleAssets = [
  {
    id: 210,
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 214.32,
    currentMarketcap: 1625282860800,
    currentChange: 0.7000000000000001,
    type: 'Stock',
    dashDaily: 1,
    dashWeekly: 0,
    dashMonthly: -1,
    rank: 2
  },
  {
    id: 1093,
    ticker: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 382.73,
    currentMarketcap: 1658881948200,
    currentChange: 0.357,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: -1,
    dashMonthly: 1,
    rank: 1
  }, {
    id: 160,
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    currentPrice: 3182.63,
    currentMarketcap: 1587419460880,
    currentChange: 3.295,
    type: 'Stock',
    dashDaily: -1,
    dashWeekly: 1,
    dashMonthly: 0,
    rank: 3
  }];

export const assetsPage1 = exampleAssets;
export const assetsPage2 = [
  {
    id: 1478,
    ticker: 'GILD',
    name: 'Gilead Sciences',
    currentPrice: 71.815,
    currentMarketcap: 90082581550,
    currentChange: 3.286,
    type: 'Stock',
    dashDaily: 4,
    dashWeekly: 4,
    dashMonthly: 4,
    rank: 90
  },
  {
    id: 3022,
    ticker: 'SBUX',
    name: 'Starbucks',
    currentPrice: 76.11,
    currentMarketcap: 88972590000,
    currentChange: -0.549,
    type: 'Stock',
    dashDaily: -1,
    dashWeekly: -1,
    dashMonthly: -1,
    rank: 91
  },
  {
    id: 593,
    ticker: 'BUD',
    name: 'Anheuser-Busch',
    currentPrice: 54.37,
    currentMarketcap: 88806715809,
    currentChange: -0.11,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 92
  }
];

export const allAssets = assetsPage1.concat(assetsPage2);

export const assetsFilterResult = [
  {
    id: 593,
    ticker: 'BUD',
    name: 'Anheuser-Busch',
    currentPrice: 54.37,
    currentMarketcap: 88806715809,
    currentChange: -0.11,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 92
  }
];

export const assetsFilterResult2ndPage = [
  {
    id: 210,
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 214.32,
    currentMarketcap: 1625282860800,
    currentChange: 0.7000000000000001,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 2
  }
];

export const allAssetsFilterResult = assetsFilterResult.concat(assetsFilterResult2ndPage);

export const assetSearchResult = [
  {
    id: 3022,
    ticker: 'SBUX',
    name: 'Starbucks',
    currentPrice: 76.11,
    currentMarketcap: 88972590000,
    currentChange: -0.549,
    type: 'Stock',
    dashDaily: -1,
    dashWeekly: -1,
    dashMonthly: -1,
    rank: 91
  }
];

export const assetsOnWatchlist = [
  {
    id: 1093,
    ticker: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 382.73,
    currentMarketcap: 1658881948200,
    currentChange: 0.357,
    type: 'Stock',
    dashDaily: 0,
    dashWeekly: 0,
    dashMonthly: 0,
    rank: 1
  }
];

export const exampleAssetsForEarningsMetric = [
  {
    id: 210,
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 214.32,
    currentMarketcap: 1625282860800,
    currentChange: 0.7000000000000001,
    type: 'Stock',
    dashDaily: 1,
    eps: 0,
    earningsDate: new Date('01-01-2000'),
    rank: 2
  },
  {
    id: 1093,
    ticker: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 382.73,
    currentMarketcap: 1658881948200,
    currentChange: 0.357,
    type: 'Stock',
    dashDaily: 0,
    eps: -1,
    earningsDate: new Date('01-02-2000'),
    rank: 1
  }, {
    id: 160,
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    currentPrice: 3182.63,
    currentMarketcap: 1587419460880,
    currentChange: 3.295,
    type: 'Stock',
    dashDaily: -1,
    eps: 1,
    earningsDate: new Date('02-01-2000'),
    rank: 3
  }];
