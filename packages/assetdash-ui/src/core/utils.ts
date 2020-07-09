import {Asset} from './models/asset';

export const formatMarketcap = (marketcap: number) => {
  return addSeparators(marketcap.toFixed(0));
};

export const formatPrice = (price: number) => {
  if (price > 1.1) {
    return addSeparators(price.toFixed(2));
  } else {
    return price.toFixed(6);
  }
};

export const formatChange = (change: number) => {
  return addSeparators(change.toFixed(2));
};

export const addSeparators = (numberAsString: string) => {
  return numberAsString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const sortByAssetName = (assets: Asset[], dir: number) => {
  const result = [...assets];
  result.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  if (dir === 1) {
    return result;
  } else {
    return result.reverse();
  }
};

export const sortByRank = (assets: Asset[], dir: number) => {
  const result = [...assets];
  result.sort((a, b) => a.rank - b.rank);
  if (dir === 1) {
    return result;
  } else {
    return result.reverse();
  }
};
