import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asObject, asString} from '@restless/sanitizers';

export const watchlist = ({assetRepository}: Services) => {
  const router = expressRouter();

  router.get('/', asyncHandler(
    sanitize({
      query: asObject({
        tickers: asString
      })
    }),
    async ({query}) => {
      return responseOf({data: await assetRepository.findWatchList(query.tickers)});
    }
  ));

  return router;
};
