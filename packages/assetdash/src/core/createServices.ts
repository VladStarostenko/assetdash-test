import knex from 'knex';
import {Config} from '../config/config';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';

export const createServices = (config: Config) => {
  const db = knex(config.database);
  return {
    db,
    assetRepository: new AssetRepository(db)
  };
};

export type Services = ReturnType<typeof createServices>;
