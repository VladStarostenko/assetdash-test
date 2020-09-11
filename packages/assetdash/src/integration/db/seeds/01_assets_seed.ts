import {getAssetsFromCSV} from '../utils';

export const seed = async function (knex) {
  const cryptoAssetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/Crypto_list.csv');
  const stocksAssetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/MAIN_SHEET.csv');
  const cryptoAssets = cryptoAssetDataFromCSV.map(([ticker, name, type]) => ({
    ticker,
    name,
    type
  }));
  const stocksAssets = stocksAssetDataFromCSV.map(([ticker, name, tag]) => ({
    ticker,
    name,
    type: tag === 'ETFs' ? 'ETF' : 'Stock'
  }));
  const assets = cryptoAssets.concat(stocksAssets);
  return knex('assets').insert(assets);
};
