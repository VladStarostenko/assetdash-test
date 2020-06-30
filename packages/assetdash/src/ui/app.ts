import express from 'express';
import {Services} from '../core/createServices';
import {router} from './routes';

export const buildApp = (services: Services) => {
  const app = express();
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(express.json());
  app.use(router(services));
  app.get('/', (_, res) => res.send('Hello assetdash!'));
  return app;
};
