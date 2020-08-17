import {addTagsForAssets, getAssetsFromCSV} from '../utils';

export const seed = async function (knex) {
  const assetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/Asset_Update_1.csv');
  const stratIndex = Number((await knex('assets').count())[0].count);
  const assetsWithTags = addTagsForAssets(assetDataFromCSV, stratIndex - assetDataFromCSV.length + 1);
  return knex('assets_tags').insert(assetsWithTags);
};
