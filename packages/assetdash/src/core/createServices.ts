import knex from 'knex';
import {Config} from '../config/config';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {IexCloudService} from '../integration/http/IexCloudService';
import pg from 'pg';
import {attachPaginate} from 'knex-paginate';
import {TagRepository} from '../integration/db/repositories/TagRepository';
import {RanksRepository} from '../integration/db/repositories/RanksRepository';
import {DashService} from './DashService';
import {Logger} from './Logger';

const PG_DECIMAL_OID = 1700;

const createDb = (config: Config) => {
  const db = knex(config.database);
  attachPaginate();
  pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  return db;
};

export const initServices = (db, config: Config) => {
  const ranksRepository = new RanksRepository(db);
  return ({
    db: db,
    assetRepository: new AssetRepository(db),
    tagRepository: new TagRepository(db),
    ranksRepository: ranksRepository,
    coinmarketCapService: new CoinmarketCapService(config.coinmarketCapBaseUrl),
    iexCloudService: new IexCloudService(config.iexCloudBaseUrl, config.iexBatchSize),
    dashService: new DashService(ranksRepository),
    logger: new Logger()
  });
};

export const createServices = (config: Config) => {
  return initServices(createDb(config), config);
};

export type Services = ReturnType<typeof createServices>;
