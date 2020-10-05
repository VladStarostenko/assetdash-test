import {getQueryParam} from './queryString';

export const getMetricParam = (location: any) => {
  const metric = getQueryParam('m', location);
  return metric ? `?m=${metric}` : '';
};
