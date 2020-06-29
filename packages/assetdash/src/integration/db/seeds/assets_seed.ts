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

const getImageUrlFor = (ticker) => {
  return `../../assets/crypto-icons/${ticker.toLowerCase()}.svg`;
};

exports.seed = async function (knex, Promise) {
  const assetDataFromCSV = await getCryptoAssetsFromCSV();
  const assets = assetDataFromCSV.map(([ticker, name, type]) => ({
    ticker,
    name,
    imageUrl: getImageUrlFor(ticker),
    type
  }));
  return knex('assets').insert(assets);
};
