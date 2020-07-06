import {createServices} from '../core/createServices';
import {config} from '../config/config';
import {PricingDataUpdater} from '../app/PricingDataUpdater';

const {iexCloudService, coinmarketCapService, assetRepository} = createServices(config);
const pricingDataUpdater = new PricingDataUpdater(iexCloudService, coinmarketCapService, assetRepository);

const run = async () => {
  const cryptoTickers = await assetRepository.getTickers('Cryptocurrency');
  const arrayCryptoTickers = cryptoTickers.map(ticker => ticker['ticker']);
  const stocksAndETFsTickers = (await assetRepository.getTickers('Stock'))
    .concat(await assetRepository.getTickers('ETF'));
  const arrayStocksAndETFsTickers = stocksAndETFsTickers.map(ticker => ticker['ticker']);
  await pricingDataUpdater.loop(arrayCryptoTickers, arrayStocksAndETFsTickers);
};

run().catch(console.error);
