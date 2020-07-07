export const formatMarketcap = (marketcap: number) => {
  return marketcap.toFixed(0);
};

export const formatPrice = (price: number) => {
  return price > 1.1 ? price.toFixed(2) : price.toFixed(6);
};

export const formatChange = (change: number) => {
  return change.toFixed(2);
};
