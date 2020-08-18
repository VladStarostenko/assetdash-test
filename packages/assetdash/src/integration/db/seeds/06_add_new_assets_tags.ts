import {addTagsForAssets, getAssetsFromCSV} from '../utils';

export const seed = async function (knex) {
  const assetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/Asset_Update_1.csv');
  const assetIds: number[] = [];
  for (const asset of assetDataFromCSV) {
    assetIds.push(((await knex('assets').select('id').where('ticker', '=', asset[0])).map(id => id.id))[0]);
  }
  const assetsWithTags = addTagsForAssets(assetDataFromCSV, assetIds);
  return knex('assets_tags').insert(assetsWithTags);
};
