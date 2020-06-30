import path from 'path';

export const getTestConfig = () => {
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
    },
    accessControlAllowOrigin: '*'
  };
};
