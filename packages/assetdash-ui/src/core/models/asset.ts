export interface Asset {
  id: number;
  rank: number;
  ticker: string;
  name: string;
  currentPrice: number;
  currentMarketcap: number;
  currentChange: number;
  type: string;
  dashDaily: number;
  dashWeekly: number;
  dashMonthly: number;
  earningsDate: Date;
  eps: number;
}
