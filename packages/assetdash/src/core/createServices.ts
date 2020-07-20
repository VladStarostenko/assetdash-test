import knex from 'knex';
import {Config} from '../config/config';
import {AssetRepository} from '../integration/db/repositories/AssetRepository';
import {CoinmarketCapService} from '../integration/http/CoinmarketCapService';
import {IexCloudService} from '../integration/http/IexCloudService';
import pg from 'pg';
import {attachPaginate} from 'knex-paginate';
import {TagRepository} from '../integration/db/repositories/TagRepository';

const PG_DECIMAL_OID = 1700;

export const createServices = (config: Config) => {
  const db = knex(config.database);
  attachPaginate();
  pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  return {
    db,
    assetRepository: new AssetRepository(db),
    tagRepository: new TagRepository(db),
    coinmarketCapService: new CoinmarketCapService(),
    iexCloudService: new IexCloudService(config.iexCloudBaseUrl)
  };
};

export type Services = ReturnType<typeof createServices>;
