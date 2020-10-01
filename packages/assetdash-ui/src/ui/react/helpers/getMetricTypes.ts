import {metrics} from '../../../core/models/metrics';

export function getMetricTypes(metric: string) {
  return metrics.find(({name}) => name === metric)?.types || [''];
}
