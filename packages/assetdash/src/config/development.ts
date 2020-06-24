import path from 'path';

export const getDevConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return {
        port: 3000,
        database: {
          client: 'pg',
          connection: {
            host: '127.0.0.1',
            database: 'assetdash_test',
            user: 'postgres',
            password: 'root'
          },
          migrations: {
            directory: path.join('dist/integration/db/migrations/')
          },
          seeds: {
            directory: path.join('src/integration/db/seeds/')
          }
        }
      };
    case 'dev':
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
        }
      };
    default:
      throw TypeError('Invalid environment');
  }
};
