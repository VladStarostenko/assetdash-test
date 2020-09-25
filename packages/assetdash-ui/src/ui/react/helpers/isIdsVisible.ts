import {getQueryParam} from './queryString';

export function isIdsVisible(location: any) {
  return !(location.pathname === '/all' || (location.pathname === '/' && !getQueryParam('q', location)));
}
