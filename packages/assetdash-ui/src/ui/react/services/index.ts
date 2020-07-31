import {config} from '../../../config/config';
import {Api} from '../../../integration/http/api';
import {WatchListService} from './WatchListService';

export type Services = ReturnType<typeof createServices>;

export function createServices() {
  return {
    config,
    api: new Api(config),
    watchlist: new WatchListService()
  };
}
