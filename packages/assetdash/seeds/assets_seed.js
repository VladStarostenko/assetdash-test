const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const getCryptoAssets = () => new Promise(resolve => {
  let csvData = [];
  fs.createReadStream(path.resolve('assetLists/Crypto_list.csv'))
    .pipe(csv.parse({headers: false}))
    .on('data', row => {
      csvData.push(row);
    })
    .on('end', () => {
      resolve(csvData);
    });
});

exports.seed = function (knex, Promise) {
  return knex('assets').del()
    .then(async () => {
      const assetNames = await getCryptoAssets();
      const assets = assetNames.map((assetName) => ({
        ticker: assetName[0],
        name: assetName[1],
        image_url: `https://cryptoicons.org/api/icon/${assetName[0].toLowerCase()}/32`,
        current_price: 0,
        current_marketcap: 0,
        current_change: 0,
        type: assetName[2],
        dash_daily: 0,
        dash_weekly: 0,
        dash_monthly: 0,
        dash_quarterly: 0
      }));
      return knex('assets').insert(assets);
    });
};
