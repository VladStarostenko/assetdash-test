import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {assets} from './assets';

export const router = (services: Services) => {
  const router = expressRouter();

  router.use('/assets', assets(services));

  return router;
};
