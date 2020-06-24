import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

const getCryptoAssetsFromCSV = () => new Promise<string[][]>(resolve => {
  const csvData: string[][] = [];
  fs.createReadStream(path.resolve('seeds/Crypto_list.csv'))
    .pipe(csv.parse({headers: false}))
    .on('data', row => {
      csvData.push(row);
    })
    .on('end', () => {
      resolve(csvData);
    });
});

const rareImagesMapping = {};

const getImageUrlFor = (ticker) => {
  if (ticker in rareImagesMapping) {
    return rareImagesMapping[ticker];
  }
  return `https://cryptoicons.org/api/icon/${ticker.toLowerCase()}/32`;
};

exports.seed = async function (knex, Promise) {
  const assetDataFromCSV = await getCryptoAssetsFromCSV();
  const assets = assetDataFromCSV.map(([ticker, name, type]) => ({
    ticker,
    name,
    image_url: getImageUrlFor(ticker),
    type
  }));
  return knex('assets').insert(assets);
};
