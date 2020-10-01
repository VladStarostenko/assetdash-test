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

export const formatEps = (eps: number | null) => {
  if (eps) {
    if (eps > 1.1) {
      return `$${addSeparators(eps.toFixed(2))}`;
    } else {
      return `$${eps.toFixed(4)}`;
    }
  } else {
    return 'Not Found';
  }
};

export const formatEarningsDate = (earningsDate: Date) => {
  return earningsDate ? `${(new Date(earningsDate)).getMonth() + 1} - ${(new Date(earningsDate)).getDate()}` : 'Not Found';
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
    return column === 'earningsDate' ? compareDates(a[column], b[column]) : compareTwoValues(a[column], b[column]);
  };

  const compareTwoValues = (first: number | string, second: number | string) => {
    if (first > second) {
      return 1;
    }
    if (first < second) {
      return -1;
    }
    return 0;
  };

  const compareDates = (first: Date, second: Date) => {
    const firstTime = (new Date(first)).getTime();
    const secondTime = (new Date(second)).getTime();
    return compareTwoValues(firstTime, secondTime);
  };

  if (assetsSort.column === 'none') {
    return assets;
  } else {
    return sort(assets, compareByStringOrNumber(assetsSort.column), assetsSort.order);
  }
};
