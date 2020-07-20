import knex from 'knex';
import pg from 'pg';
import {attachPaginate} from 'knex-paginate';
import {initServices} from '../../src/core/createServices';
import {config} from '../../src/config/config';

const PG_DECIMAL_OID = 1700;

export function createTestServices() {
  const db = knex(config.database);
  pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  try {
    attachPaginate();
  } catch (e) {
  }
  return initServices(db, config);
}
