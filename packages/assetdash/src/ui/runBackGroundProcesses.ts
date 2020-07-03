import {createServices} from '../core/createServices';
import {config} from '../config/config';
import {PricingDataUpdater} from '../app/PricingDataUpdater';

const {coinmarketCapService, assetRepository} = createServices(config);
const pricingDataUpdater = new PricingDataUpdater(coinmarketCapService, assetRepository);

const run = async () => {
  const cryptoTickers = await assetRepository.getTickers('Cryptocurrency');
  const arrayTickers = cryptoTickers.map(ticker => ticker['ticker']);
  await pricingDataUpdater.loop(arrayTickers);
};

run().catch(console.error);
