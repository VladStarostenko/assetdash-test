import {config} from '../../../config/config';
import {Api} from '../../../integration/http/api';
import {CookieService} from './CookieService';

export type Services = ReturnType<typeof createServices>;

export function createServices() {
  return {
    config,
    api: new Api(config),
    cookie: new CookieService()
  };
}
