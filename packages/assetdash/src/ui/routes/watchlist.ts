import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asArray, asObject, asString} from '@restless/sanitizers';
import {asAssetType} from '../../core/sanitizers/asAssetType';

export const watchlist = ({assetRepository}: Services) => {
  const router = expressRouter();

  router.get('/', asyncHandler(
    sanitize({
      query: asObject({
        tickers: asString,
        typesOfAssets: asArray(asAssetType)
      })
    }),
    async ({query}) => {
      return responseOf({data: await assetRepository.findWatchList(query.tickers, query.typesOfAssets)});
    }
  ));

  return router;
};
