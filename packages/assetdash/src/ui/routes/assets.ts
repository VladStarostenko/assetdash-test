import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asArray, asNumber, asObject, asOptional, asString} from '@restless/sanitizers';
import {asAssetType} from '../../core/sanitizers/asAssetType';

export const assets = ({assetRepository}: Services) => {
  const router = expressRouter();

  router.get('/', asyncHandler(
    sanitize({
      query: asObject({
        currentPage: asOptional(asNumber),
        perPage: asOptional(asNumber),
        nameOrTickerPart: asOptional(asString),
        sector: asOptional(asString),
        typesOfAssets: asArray(asAssetType)
      })
    }),
    async ({query}) => {
      if (query.sector && query.currentPage && query.perPage) {
        return responseOf(await assetRepository.findByTags(query.sector, query.currentPage, query.perPage, query.typesOfAssets));
      } else if (query.nameOrTickerPart) {
        return responseOf({data: await assetRepository.findByNameOrTickerPart(query.nameOrTickerPart, query.typesOfAssets)});
      } else if (query.currentPage && query.perPage) {
        return responseOf(await assetRepository.findPage(query.currentPage, query.perPage, query.typesOfAssets));
      } else {
        return responseOf(await assetRepository.findAll());
      }
    }
  ));

  return router;
};
