export const formatMarketcap = (marketcap: number) => {
  return addSeparaters(marketcap.toFixed(0));
};

export const formatPrice = (price: number) => {
  const priceAsString = price > 1.1 ? price.toFixed(2) : price.toFixed(6);
  return addSeparaters(priceAsString);
};

export const formatChange = (change: number) => {
  return addSeparaters(change.toFixed(2));
};

const addSeparaters = (numberAsString: string) => {
  return numberAsString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
