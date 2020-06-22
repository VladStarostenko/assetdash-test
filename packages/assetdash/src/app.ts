import express from 'express';
import {Services} from './services';
import {router} from './routes';

export const buildApp = (services: Services) => {
  const app = express();
  app.use(express.json());
  app.use(router(services));
  app.get('/', (_, res) => res.send('Hello assetdash!'));
  return app;
};
