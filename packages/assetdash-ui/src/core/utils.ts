import {Asset} from './models/asset';
import {AssetsSort} from './models/assetsSort';

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

export const sortAssets = (assets: Asset[], assetsSort: AssetsSort) => {
  function sort(assets: Asset[], compare: (a: Asset, b: Asset) => number, order: 'desc' | 'asc') {
    const result = [...assets];
    result.sort(compare);
    return order === 'asc' ? result : result.reverse();
  }

  const compareByStringOrNumber = (column: keyof Asset) => (a: Asset, b: Asset) => {
    if (a[column] > b[column]) {
      return 1;
    }
    if (a[column] < b[column]) {
      return -1;
    }
    return 0;
  };

  if (assetsSort.column === 'none') {
    return assets;
  } else {
    return sort(assets, compareByStringOrNumber(assetsSort.column), assetsSort.order);
  }
};
