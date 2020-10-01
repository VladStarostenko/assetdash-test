export type MetricName = 'Dash' | 'Earnings';

export interface Metric {
  name: MetricName;
  label: string;
  types: string[];
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
