export const formatMarketcap = (marketcap: number) => {
  return Number(marketcap).toFixed(0);
};

export const formatPrice = (price: number) => {
  price = Number(price);
  return price > 1.1 ? price.toFixed(2) : price.toFixed(6);
};
