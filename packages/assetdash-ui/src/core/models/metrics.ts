export type MetricName = 'Dash' | 'Earnings';
export type MetricType = 'Stock' | 'ETF' | 'Cryptocurrency'

export interface Metric {
  name: MetricName;
  label: string;
  types: MetricType[];
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
