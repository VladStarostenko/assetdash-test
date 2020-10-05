export type MetricName = 'Dash' | 'Earnings';
export type AssetType = 'Stock' | 'ETF' | 'Cryptocurrency'

export interface Metric {
  name: MetricName;
  label: string;
  types: AssetType[];
}

export const metrics: Array<Metric> = [
  {
    name: 'Dash',
    label: 'ALL',
    types: ['Stock', 'ETF', 'Cryptocurrency']
  }, {
    name: 'Earnings',
    label: 'STOCKS',
    types: ['Stock']
  }
];
