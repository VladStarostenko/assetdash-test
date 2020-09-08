import {addTagsForAssets, findIdsOfAssetsFromCSV, getAssetsFromCSV} from '../utils';

export const seed = async function (knex) {
  const assetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/Asset_Update_2.csv');
  const assetIds = await findIdsOfAssetsFromCSV(knex, assetDataFromCSV);
  const assetsWithTags = addTagsForAssets(assetDataFromCSV, assetIds);
  return knex('assets_tags').insert(assetsWithTags);
};
