import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {assets} from './assets';
import {watchlist} from './watchlist';

export const router = (services: Services) => {
  const router = expressRouter();

  router.use('/assets', assets(services));
  router.use('/watchlist', watchlist(services));

  return router;
};
