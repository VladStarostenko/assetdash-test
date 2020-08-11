import adapter from 'axios/lib/adapters/http';
import {Api} from '../../src/integration/http/api';
import {Services} from '../../src/ui/react/services';
import {WatchListService} from '../../src/ui/react/services/WatchListService';

export function createTestServices(): Services {
  const config = Object.freeze({baseURL: 'http://127.0.0.1', oneSignalAppId: ''});
  const axiosConfig = {...config, adapter};
  return {
    config,
    api: new Api(axiosConfig),
    watchlist: new WatchListService()
  };
}
