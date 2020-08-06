import {getAssetsFromCSV, tagIdOf} from '../utils';

interface AssetWithTag {
  tagId: number;
  assetId: number;
}

const assetIdOf = (assetIndex: number) => assetIndex + 1;

export const addTagsForStocksAssets = (stocksAssets: string[][], startIndex: number): AssetWithTag[] => {
  return stocksAssets.map((stocksAsset, assetIndex) => {
    return stocksAsset.slice(2)
      .filter(elem => !!elem)
      .map(tag => ({
        tagId: tagIdOf(tag), assetId: assetIdOf(startIndex + assetIndex)
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
  const stocksAssetsWithTags = addTagsForStocksAssets(stocksAssets, cryptoAssets.length);
  const assetsWithTags = cryptoAssetsWithTags.concat(stocksAssetsWithTags);
  return knex('assets_tags').insert(assetsWithTags);
};
