import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asArray, asNumber, asObject, asOptional, asString} from '@restless/sanitizers';

export const assets = ({assetRepository, tagRepository}: Services) => {
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
        perPage: asOptional(asNumber),
        nameOrTickerPart: asOptional(asString),
        sectors: asOptional(asArray(asString))
      })
    }),
    async ({query}) => {
      if (query.currentPage && query.perPage) {
        return responseOf(await assetRepository.findPage(query.currentPage, query.perPage));
      } else if (query.nameOrTickerPart) {
        return responseOf(await assetRepository.findByNameOrTickerPart(query.nameOrTickerPart));
      } else if (query.sectors) {
        return responseOf(await assetRepository.findByIds(await getAssetIds(query.sectors)));
      } else {
        return responseOf(await assetRepository.findAll());
      }
    }
  ));

  const getAssetIds = async (sectors: string[]) => {
    const tagsIdsObject = await tagRepository.getTagsIds(sectors);
    const tagsIds = tagsIdsObject.map(tagsIdObject => tagsIdObject.id);
    const assetIdsObject = await tagRepository.findByTagIds(tagsIds);
    return assetIdsObject.map(assetIdObject => assetIdObject.assetId);
  };

  return router;
};
