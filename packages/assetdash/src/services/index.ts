import knex from 'knex';
import {Config} from '../config';
import {AssetService} from './AssetService';
import {AssetRepository} from '../repositories/AssetRepository';

export const createServices = (config: Config) => {
  const db = knex(config.database);
  return {
    db,
    assetService: new AssetService(new AssetRepository(db))
  };
};

export type Services = ReturnType<typeof createServices>;
