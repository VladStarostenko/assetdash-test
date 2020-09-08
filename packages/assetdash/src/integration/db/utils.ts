import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

export const tagNames: string[] = ['Cryptocurrency', 'ETFs', 'Internet', 'Finance', 'Hospitality', 'Retail', 'Health',
  'Emerging Markets', 'Airline', 'E-commerce', 'Cloud', 'Energy', 'Gold', 'Gamble', 'Green', 'Cars', 'SP500'];

export const getAssetsFromCSV = (filePath: string) => new Promise<string[][]>(resolve => {
  const csvData: string[][] = [];
  fs.createReadStream(path.resolve(filePath))
    .pipe(csv.parse({headers: false}))
    .on('data', row => {
      csvData.push(row);
    })
    .on('end', () => {
      resolve(csvData);
    });
});

export const tagIdOf = (tag: string) => tagNames.indexOf(tag) + 1;

export const getTypeOfAsset = (tag: string) => {
  return tag === 'ETFs' ? 'ETF' : tag === 'Cryptocurrency' ? 'Cryptocurrency' : 'Stock';
};

interface AssetWithTag {
  tagId: number;
  assetId: number;
}

export const assetIdOf = (assetIndex: number) => assetIndex + 1;

export const addTagsForAssets = (assets: string[][], assetIds: number[]): AssetWithTag[] => {
  return assets.map((asset, assetIndex) => {
    return asset.slice(2)
      .filter(elem => !!elem)
      .map(tag => ({
        tagId: tagIdOf(tag), assetId: assetIds[assetIndex]
      }));
  }).reduce((acc, val) => [...acc, ...val], []);
};

export const findIdsOfAssetsFromCSV = async (knex: any, assetDataFromCSV: string[][]) => {
  const assetIds: number[] = [];
  for (const asset of assetDataFromCSV) {
    assetIds.push((await knex('assets').first('id').where('ticker', '=', asset[0])).id);
  }
  return assetIds;
};
