const pageTitles = [
  {
    sectorName: 'Stock',
    title: 'Largest Companies'
  },
  {
    sectorName: 'Internet',
    title: 'Internet Stocks'
  },
  {
    sectorName: 'Hospitality',
    title: 'Hospitality Stocks'
  },
  {
    sectorName: 'Retail',
    title: 'Retail Stocks'
  },
  {
    sectorName: 'SP500',
    title: 'S&P 500'
  },
  {
    sectorName: 'Finance',
    title: 'Finance Stocks'
  },
  {
    sectorName: 'Health',
    title: 'Health Stocks'
  },
  {
    sectorName: 'Cloud',
    title: 'Cloud Stocks'
  },
  {
    sectorName: 'E-commerce',
    title: 'Ecommerce Stocks'
  },
  {
    sectorName: 'Emerging Markets',
    title: 'Emerging Markets Stocks'
  },
  {
    sectorName: 'Airline',
    title: 'Airline Stocks'
  },
  {
    sectorName: 'Cars',
    title: 'Car Stocks'
  },
  {
    sectorName: 'Gamble',
    title: 'Casino Stocks'
  },
  {
    sectorName: 'Gold',
    title: 'Gold Stocks'
  },
  {
    sectorName: 'Cryptocurrency',
    title: 'Cryptos'
  },
  {
    sectorName: 'Green',
    title: 'Cannabis Stocks'
  },
  {
    sectorName: 'ETFs',
    title: 'ETFs'
  }
];

export function getPageTitle(sector: string) {
  return pageTitles.find(({sectorName}) => sectorName === sector)?.title || '';
}
