import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asNumber, asObject} from '@restless/sanitizers';

export const assets = ({assetRepository}: Services) => {
  const router = expressRouter();

  // router.get('/', asyncHandler(
  //   async () => responseOf(await assetRepository.findAll())
  // ));

  router.get('/:id', asyncHandler(
    sanitize({
      id: asNumber
    }),
    async ({id}) => responseOf(await assetRepository.findById(id))
  ));

  router.get('/', asyncHandler(
    sanitize({
      query: asObject({
        currentPage: asNumber,
        perPage: asNumber
      })
    }),
    async ({query}) => responseOf(await assetRepository.findPage(query.currentPage, query.perPage))
  ));

  return router;
};
