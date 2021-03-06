import path from 'path';

export const getProdConfig = () => {
  return {
    port: Number(process.env.PORT),
    database: {
      client: 'pg',
      connection: {
        host: process.env.DB_URL,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
      },
      migrations: {
        directory: path.join('dist/integration/db/migrations/')
      },
      seeds: {
        directory: path.join('src/integration/db/seeds/')
      }
    },
    accessControlAllowOrigin: process.env.ALLOW_ORIGIN || 'https://assetdash2020.netlify.app',
    coinmarketCapBaseUrl: 'https://pro-api.coinmarketcap.com',
    coinmarketCapKey: process.env.COINMARKETCAP_KEY,
    priceUpdateTime: process.env.REFRESH_RATE || 60000,
    iexCloudBaseUrl: 'https://cloud.iexapis.com',
    iexCloudKey: process.env.IEXCLOUD_KEY,
    iexBatchSize: 100
  };
};
