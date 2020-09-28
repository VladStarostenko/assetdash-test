import {createServices} from '../core/createServices';
import {config} from '../config/config';
import {EarningsDataUpdater} from '../app/EarningsDataUpdater';

const {iexCloudService, assetRepository, logger} = createServices(config);

const earningsUpdater = new EarningsDataUpdater(
  iexCloudService,
  assetRepository,
  logger
);

const run = async () => {
  const stocksTickers = await assetRepository.getTickers('Stock');
  await earningsUpdater.loop(stocksTickers);
};

run().catch(console.error);
