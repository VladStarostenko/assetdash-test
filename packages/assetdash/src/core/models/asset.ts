export interface Asset {
  id: number;
  ticker: string;
  name: string;
  image_url: string;
  current_price: number;
  current_marketcap: number;
  current_change: number;
  type: string;
  dash_daily: number;
  dash_weekly: number;
  dash_monthly: number;
  dash_quarterly: number;
}
