import {getProdConfig} from './production';
import {getDevConfig} from './development';
import {getTestConfig} from './test';
import {Request, Response, NextFunction} from 'express';

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

export const setHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

export const config = Object.freeze(configObject);

export type Config = typeof config;
