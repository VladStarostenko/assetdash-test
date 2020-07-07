import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

export const tagNames: string[] = ['Cryptocurrency', 'ETFs', 'Internet', 'Finance', 'Hospitality', 'Retail', 'Health',
  'Emerging Markets', 'Airline', 'E-commerce', 'Cloud', 'Energy', 'Gold', 'Gamble', 'Green', 'Cars'];

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
