import {Asset} from './models/asset';
import {AssetsSort} from './models/assetsSort';

export const sortAssets = (assets: Asset[], assetsSort: AssetsSort) => {
  function sort(assets: Asset[], compare: (a: Asset, b: Asset) => number, order: 'desc' | 'asc') {
    const result = [...assets];
    result.sort(compare);
    return order === 'asc' ? result : result.reverse();
  }

  const compare = (column: keyof Asset) => (a: Asset, b: Asset) => {
    return column === 'earningsDate' ? compareDates(a[column], b[column]) : compareByStringOrNumber(a[column], b[column]);
  };

  const compareByStringOrNumber = (first: number | string, second: number | string) => {
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
    if (firstTime === 0) {
      return 1;
    }
    const secondTime = (new Date(second)).getTime();
    if (secondTime === 0) {
      return -1;
    }
    return compareByStringOrNumber(firstTime, secondTime);
  };

  if (assetsSort.column === 'none') {
    return assets;
  } else {
    return sort(assets, compare(assetsSort.column), assetsSort.order);
  }
};
