import {config} from '../../../config/config';
import {Api} from '../../../integration/http/api';

export type Services = ReturnType<typeof createServices>;

export function createServices() {
  return {
    config,
    api: new Api(config)
  };
}
