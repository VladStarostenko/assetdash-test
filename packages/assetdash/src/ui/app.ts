import express from 'express';
import {Services} from '../core/createServices';
import {router} from './routes';
import {setHeaders} from '../config/config';

export const buildApp = (services: Services) => {
  const app = express();
  app.use(setHeaders);
  app.use(express.json());
  app.use(router(services));
  app.get('/', (_, res) => res.send('Hello assetdash!'));
  return app;
};
