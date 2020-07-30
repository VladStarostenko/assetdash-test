type AssetType = 'Cryptocurrency' | 'Stock' | 'ETF';

export interface Asset {
  id: number;
  ticker: string;
  name: string;
  imageUrl: string;
  currentPrice?: number;
  currentMarketcap?: number;
  currentChange?: number;
  type: AssetType;
  dashDaily?: number;
  dashWeekly?: number;
  dashMonthly?: number;
  rank?: number;
  lastUpdated?: Date;
}
