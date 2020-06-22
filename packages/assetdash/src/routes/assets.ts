import {Services} from '../services';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asAssets} from '../sanitizers/asAssets';
import {asNumber} from '@restless/sanitizers';

export const assets = ({assetService}: Services) => {
  const router = expressRouter();

  router.post('/', asyncHandler(
    sanitize({
      body: asAssets
    }),
    async ({body}) => responseOf(await assetService.upload(body.assets))
  ));

  router.get('/:id', asyncHandler(
    sanitize({
      id: asNumber
    }),
    async ({id}) => responseOf(await assetService.getAssetFromId(id))
  ));

  return router;
};
