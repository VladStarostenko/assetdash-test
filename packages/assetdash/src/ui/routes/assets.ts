import {Services} from '../../core/createServices';
import {Router as expressRouter} from 'express';
import {asyncHandler, sanitize, responseOf} from '@restless/restless';
import {asNumber} from '@restless/sanitizers';

export const assets = ({assetRepository}: Services) => {
  const router = expressRouter();

  router.get('/', asyncHandler(
    async () => responseOf(await assetRepository.findAll())
  ));

  router.get('/:id', asyncHandler(
    sanitize({
      id: asNumber
    }),
    async ({id}) => responseOf(await assetRepository.findById(id))
  ));

  router.get('/page/:currentPage/:perPage', asyncHandler(
    sanitize({
      currentPage: asNumber,
      perPage: asNumber
    }),
    async ({currentPage, perPage}) => responseOf(await assetRepository.findPage(currentPage, perPage))
  ));

  return router;
};
