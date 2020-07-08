export const formatMarketcap = (marketcap: number) => {
  return addSeparators(marketcap.toFixed(0));
};

export const formatPrice = (price: number) => {
  const priceAsString = price > 1.1 ? price.toFixed(2) : price.toFixed(6);
  return addSeparators(priceAsString);
};

export const formatChange = (change: number) => {
  return addSeparators(change.toFixed(2));
};

export const addSeparators = (numberAsString: string) => {
  return numberAsString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
