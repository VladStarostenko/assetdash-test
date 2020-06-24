import * as path from 'path';

export const config = Object.freeze({
  port: Number(process.env.PORT) || 3000,
  database: {
    client: 'pg',
    connection: {
      host: process.env.DB_URL || '127.0.0.1',
      database: process.env.DB_NAME || 'assetdash',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'root'
    },
    migrations: {
      directory: path.join('dist/integration/db/migrations/')
    },
    seeds: {
      directory: path.join('src/integration/db/seeds/')
    }
  }
});

export type Config = typeof config;
