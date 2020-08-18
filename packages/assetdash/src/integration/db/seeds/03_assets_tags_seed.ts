import {addTagsForAssets, assetIdOf, getAssetsFromCSV, tagIdOf} from '../utils';

export const seed = async function (knex) {
  const cryptoAssets = await getAssetsFromCSV('src/integration/db/seeds/Crypto_list.csv');
  const stocksAssets = await getAssetsFromCSV('src/integration/db/seeds/MAIN_SHEET.csv');
  const cryptoAssetsWithTags = cryptoAssets.map((cryptoAsset, index) => ({
    tagId: tagIdOf('Cryptocurrency'),
    assetId: assetIdOf(index)
  }));
  const assetIds: number[] = [];
  for (const asset of stocksAssets) {
    assetIds.push(((await knex('assets').select('id').where('ticker', '=', asset[0])).map(id => id.id))[0]);
  }
  const stocksAssetsWithTags = addTagsForAssets(stocksAssets, assetIds);
  const assetsWithTags = cryptoAssetsWithTags.concat(stocksAssetsWithTags);
  return knex('assets_tags').insert(assetsWithTags);
};
