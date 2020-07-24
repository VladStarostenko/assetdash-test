import {createServices} from '../core/createServices';
import {config} from '../config/config';
import {PricingDataUpdater} from '../app/PricingDataUpdater';

const {iexCloudService, coinmarketCapService, assetRepository, ranksRepository} = createServices(config);
const pricingDataUpdater = new PricingDataUpdater(
  iexCloudService,
  coinmarketCapService,
  assetRepository,
  ranksRepository);

const run = async () => {
  const cryptoTickers = await assetRepository.getTickers('Cryptocurrency');
  const stocksAndETFsTickers = (await assetRepository.getTickers('Stock'))
    .concat(await assetRepository.getTickers('ETF'));
  await pricingDataUpdater.loop(cryptoTickers, stocksAndETFsTickers);
};

run().catch(console.error);
