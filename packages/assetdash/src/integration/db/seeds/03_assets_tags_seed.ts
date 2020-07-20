import {getAssetsFromCSV, tagNames} from '../utils';

interface AssetWithTag {
  tagId: number;
  assetId: number;
}

const tagIdOf = (tag: string) => tagNames.indexOf(tag) + 1;

const assetIdOf = (assetIndex: number) => assetIndex + 1;

export const extractTags = (stocksAssets: string[][]): AssetWithTag[] => {
  return stocksAssets.map((stocksAsset, assetIndex) => {
    return stocksAsset.slice(2)
      .filter(elem => !!elem)
      .map(tag => ({
        tagId: tagIdOf(tag), assetId: assetIdOf(assetIndex + 51)
      }));
  }).reduce((acc, val) => [...acc, ...val], []);
};

export const seed = async function (knex) {
  const cryptoAssets = await getAssetsFromCSV('src/integration/db/seeds/Crypto_list.csv');
  const stocksAssets = await getAssetsFromCSV('src/integration/db/seeds/MAIN_SHEET.csv');
  const cryptoAssetsWithTags = cryptoAssets.map((cryptoAsset, index) => ({
    tagId: tagIdOf('Cryptocurrency'),
    assetId: assetIdOf(index)
  }));
  const assetsWithTags = cryptoAssetsWithTags.concat(extractTags(stocksAssets));
  return knex('assets_tags').insert(assetsWithTags);
};
