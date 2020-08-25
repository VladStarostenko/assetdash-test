import {getAssetsFromCSV} from '../utils';

export const seed = async function (knex) {
  const assetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/SP_500.csv');
  const assetIds: number[] = [];
  for (const asset of assetDataFromCSV) {
    assetIds.push((await knex('assets').select('id').where('ticker', '=', asset[0]).pluck('id'))[0]);
  }
  const tagId = await knex('tags').select('id').where('name', 'SP500').pluck('id');
  const assetsWithTags = assetIds.map((assetId, index) => {
    if (assetId) {
      return {
        tagId: tagId[0], assetId
      };
    } else {
      console.log(index);
    }
  });

  return knex('assets_tags').insert(assetsWithTags);
};
