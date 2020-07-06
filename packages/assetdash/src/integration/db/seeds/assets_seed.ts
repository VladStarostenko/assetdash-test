import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

const getCryptoAssetsFromCSV = () => new Promise<string[][]>(resolve => {
  const csvData: string[][] = [];
  fs.createReadStream(path.resolve('src/integration/db/seeds/Crypto_list.csv'))
    .pipe(csv.parse({headers: false}))
    .on('data', row => {
      csvData.push(row);
    })
    .on('end', () => {
      resolve(csvData);
    });
});

const getStocksAssetsFromCSV = () => {
  return new Promise<string[][]>(resolve => {
    const csvData: string[][] = [];
    fs.createReadStream(path.resolve('src/integration/db/seeds/MAIN_SHEET.csv'))
      .pipe(csv.parse({headers: false}))
      .on('data', row => {
        if (row[0] !== 'Ticker') {
          csvData.push(row);
        }
      })
      .on('end', () => {
        resolve(csvData);
      });
  });
};

const getImageUrlForCrypto = (ticker) => {
  return `../../assets/crypto-icons/${ticker.toLowerCase()}.svg`;
};

const getImageUrlForStocks = (ticker) => {
  return `https://storage.googleapis.com/iex/api/logos/${ticker}.png`;
};

exports.seed = async function (knex, Promise) {
  const cryptoAssetDataFromCSV = await getCryptoAssetsFromCSV();
  const stocksAssetDataFromCSV = await getStocksAssetsFromCSV();
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
