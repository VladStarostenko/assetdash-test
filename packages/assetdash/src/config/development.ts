import path from 'path';

export const getDevConfig = () => {
  return {
    port: 3000,
    database: {
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        database: 'assetdash_dev',
        user: 'postgres',
        password: 'root'
      },
      migrations: {
        directory: path.join('dist/integration/db/migrations/')
      },
      seeds: {
        directory: path.join('src/integration/db/seeds/')
      }
    },
    accessControlAllowOrigin: '*',
    coinmarketCapBaseUrl: 'https://pro-api.coinmarketcap.com',
    coinmarketCapKey: process.env.COINMARKETCAP_KEY
  };
};
