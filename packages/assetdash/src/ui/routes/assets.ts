import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asArray, asNumber, asObject, asOptional, asString} from '@restless/sanitizers';

export const assets = ({assetRepository, tagRepository}: Services) => {
  const router = expressRouter();

  router.get('/', asyncHandler(
    sanitize({
      query: asObject({
        currentPage: asOptional(asNumber),
        perPage: asOptional(asNumber),
        nameOrTickerPart: asOptional(asString),
        sectors: asOptional(asArray(asString))
      })
    }),
    async ({query}) => {
      if (query.sectors && query.currentPage && query.perPage) {
        return responseOf(await assetRepository.findByTags(query.sectors, query.currentPage, query.perPage));
      } else if (query.nameOrTickerPart) {
        return responseOf(await assetRepository.findByNameOrTickerPart(query.nameOrTickerPart));
      } else if (query.currentPage && query.perPage) {
        return responseOf(await assetRepository.findPage(query.currentPage, query.perPage));
      } else {
        return responseOf(await assetRepository.findAll());
      }
    }
  ));

  return router;
};
