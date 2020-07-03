import knex from 'knex';
import {Config} from '../config/config';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';

export const createServices = (config: Config) => {
  const db = knex(config.database);
  return {
    db,
    assetRepository: new AssetRepository(db),
    coinmarketCapService: new CoinmarketCapService()
  };
};

export type Services = ReturnType<typeof createServices>;
