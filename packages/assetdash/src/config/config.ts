import {getProdConfig} from './production';
import {getDevConfig} from './development';

export const config = Object.freeze(
  process.env.NODE_ENS === 'prod' ? getProdConfig() : getDevConfig()
);

export type Config = typeof config;
