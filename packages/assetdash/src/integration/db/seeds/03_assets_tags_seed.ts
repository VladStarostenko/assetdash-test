import {getAssetsFromCSV, tagNames} from '../utils';

interface AssetWithTag {
  tagId: number;
  assetId: number;
}

exports.seed = async function (knex, Promise) {
  const cryptoAssets = await getAssetsFromCSV('src/integration/db/seeds/Crypto_list.csv');
  const stocksAssets = await getAssetsFromCSV('src/integration/db/seeds/MAIN_SHEET.csv');
  const cryptoAssetsWithTags = cryptoAssets.map((cryptoAsset, index) => ({
    tagId: tagNames.indexOf('Cryptocurrency') + 1,
    assetId: index + 1
  }));

  const test: AssetWithTag[] = [];
  stocksAssets.map((stocksAsset, assetIndex) => {
    stocksAsset.map((tag, index) => {
      if (index > 1 && tag) {
        test.push({
          tagId: tagNames.indexOf(tag) + 1,
          assetId: assetIndex + 1
        });
      }
    });
  });

  const assetsWithTags = cryptoAssetsWithTags.concat(test);
  return knex('assets_tags').insert(assetsWithTags);
};
