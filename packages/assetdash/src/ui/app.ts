import express from 'express';
import {Services} from '../core/createServices';
import {router} from './routes';
import {config} from '../config/config';
import {corsMiddleware} from './middlewares/corsMiddleware';

export const buildApp = (services: Services) => {
  const app = express();
  app.use(corsMiddleware(config));
  app.use(express.json());
  app.use(router(services));
  app.get('/', (_, res) => res.send('Hello assetdash!'));
  return app;
};
