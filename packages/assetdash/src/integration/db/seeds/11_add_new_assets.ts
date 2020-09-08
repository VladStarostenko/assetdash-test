import {getAssetsFromCSV, getTypeOfAsset} from '../utils';

export const seed = async function (knex) {
  const assetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/Asset_Update_2.csv');
  const newAssets = assetDataFromCSV.map(([ticker, name, tag]) => ({
    ticker,
    name,
    type: getTypeOfAsset(tag)
  }));
  return knex('assets').insert(newAssets);
};
