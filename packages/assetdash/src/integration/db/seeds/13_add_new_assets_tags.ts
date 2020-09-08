import {findIdsOfAssetsFromCSV, getAssetsFromCSV} from '../utils';

export const seed = async function (knex) {
  const assetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/SP_500.csv');
  const assetIds = await findIdsOfAssetsFromCSV(knex, assetDataFromCSV);
  const tagId = await knex('tags').select('id').where('name', 'SP500').pluck('id');
  const assetsWithTags = assetIds.map(assetId => ({tagId: tagId[0], assetId}));
  return knex('assets_tags').insert(assetsWithTags);
};
