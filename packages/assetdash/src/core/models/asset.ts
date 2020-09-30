type AssetType = 'Cryptocurrency' | 'Stock' | 'ETF';

export interface Asset {
  id: number;
  ticker: string;
  name: string;
  currentPrice?: number;
  currentMarketcap?: number;
  currentChange?: number;
  type: AssetType;
  dashDaily?: number;
  dashWeekly?: number;
  dashMonthly?: number;
  rank?: number;
  earningsDate?: Date;
  eps?: number;
}
