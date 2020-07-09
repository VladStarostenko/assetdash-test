export interface Asset {
  id: number;
  rank: number;
  ticker: string;
  name: string;
  imageUrl: string;
  currentPrice: number;
  currentMarketcap: number;
  currentChange: number;
  type: string;
  dashDaily: number;
  dashWeekly: number;
  dashMonthly: number;
}
