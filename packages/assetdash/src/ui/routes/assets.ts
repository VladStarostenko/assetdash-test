import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asNumber, asObject, asOptional} from '@restless/sanitizers';

export const assets = ({assetRepository}: Services) => {
  const router = expressRouter();

  router.get('/:id', asyncHandler(
    sanitize({
      id: asNumber
    }),
    async ({id}) => responseOf(await assetRepository.findById(id))
  ));

  router.get('/', asyncHandler(
    sanitize({
      query: asObject({
        currentPage: asOptional(asNumber),
        perPage: asOptional(asNumber)
      })
    }),
    async ({query}) => responseOf(query.currentPage && query.perPage
      ? await assetRepository.findPage(query.currentPage, query.perPage)
      : await assetRepository.findAll())
  ));

  return router;
};
