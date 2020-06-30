import {getProdConfig} from './production';
import {getDevConfig} from './development';
import {getTestConfig} from './test';

let configObject;

switch (process.env.NODE_ENV) {
  case 'prod':
    configObject = getProdConfig();
    break;
  case 'test':
    configObject = getTestConfig();
    break;
  case 'dev':
    configObject = getDevConfig();
    break;
  default:
    throw TypeError('Invalid environment');
}

export const config = Object.freeze(configObject);

export type Config = typeof config;
