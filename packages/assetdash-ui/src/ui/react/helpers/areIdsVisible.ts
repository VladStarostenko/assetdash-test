import {getQueryParam} from './queryString';

export function areIdsVisible(location: any) {
  return !(location.pathname === '/all' || (location.pathname === '/' && !getQueryParam('q', location)));
}
