export type Column = 'rank' | 'dashDaily' | 'dashWeekly' | 'dashMonthly' | 'name' | 'ticker' | 'currentMarketcap'
| 'currentPrice' | 'currentChange' | 'none';

export type Order = 'desc' | 'asc';

export type AssetsSort = {
  column: Column;
  order: Order;
}
