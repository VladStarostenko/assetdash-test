export type MetricName = 'Dash' | 'Earnings';

export interface Metric {
  name: MetricName;
  label: string;
  types: string[];
}
