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

export const formatEps = (eps: number) => {
  return `$${addSeparators(eps.toFixed(2))}`;
};

export const formatEarningsDate = (earningsDate: Date) => {
  return `${(new Date(earningsDate)).toLocaleString('default', {month: 'short'})} ${(new Date(earningsDate)).getDate()}`;
};

export const formatChange = (change: number) => {
  return addSeparators(change.toFixed(2));
};

export const addSeparators = (numberAsString: string) => {
  return numberAsString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
