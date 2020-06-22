import knex from 'knex';
import {config} from './config';

(async () => {
  const db = knex(config.database);
  try {
    await db.migrate.latest();
    await db.destroy();
  } catch (err) {
    console.error(err);
    await db.destroy();
    process.exit(1);
  }
})();
