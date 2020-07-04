import knex from 'knex';
import {Config} from '../config/config';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {IexCloudService} from '../integration/http/IexCloudService';

export const createServices = (config: Config) => {
  const db = knex(config.database);
  return {
    db,
    assetRepository: new AssetRepository(db),
    coinmarketCapService: new CoinmarketCapService(),
    iexCloudService: new IexCloudService()
  };
};

export type Services = ReturnType<typeof createServices>;
