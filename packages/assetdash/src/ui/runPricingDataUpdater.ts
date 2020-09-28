import {createServices} from '../core/createServices';
import {config} from '../config/config';
import {PricingDataUpdater} from '../app/PricingDataUpdater';

const {iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService, logger} = createServices(config);
const pricingDataUpdater = new PricingDataUpdater(
  iexCloudService,
  coinmarketCapService,
  assetRepository,
  ranksRepository,
  dashService,
  logger
);

const run = async () => {
  const cryptoTickers = await assetRepository.getTickers('Cryptocurrency');
  const stocksTickers = await assetRepository.getTickers('Stock');
  const stocksAndETFsTickers = stocksTickers.concat(await assetRepository.getTickers('ETF'));
  await pricingDataUpdater.loop(cryptoTickers, stocksAndETFsTickers);
};

run().catch(console.error);
