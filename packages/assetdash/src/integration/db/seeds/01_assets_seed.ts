import {getAssetsFromCSV} from '../utils';

const getImageUrlForCrypto = (ticker) => {
  return `../../assets/crypto-icons/${ticker.toLowerCase()}.svg`;
};

const getImageUrlForStocks = (ticker) => {
  return `https://storage.googleapis.com/iex/api/logos/${ticker}.png`;
};

export const seed = async function (knex) {
  const cryptoAssetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/Crypto_list.csv');
  const stocksAssetDataFromCSV = await getAssetsFromCSV('src/integration/db/seeds/MAIN_SHEET.csv');
  const cryptoAssets = cryptoAssetDataFromCSV.map(([ticker, name, type]) => ({
    ticker,
    name,
    imageUrl: getImageUrlForCrypto(ticker),
    type
  }));
  const stocksAssets = stocksAssetDataFromCSV.map(([ticker, name, tag]) => ({
    ticker,
    name,
    imageUrl: getImageUrlForStocks(ticker),
    type: tag === 'ETFs' ? 'ETF' : 'Stock'
  }));
  const assets = cryptoAssets.concat(stocksAssets);
  return knex('assets').insert(assets);
};
