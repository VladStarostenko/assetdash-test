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
    }
  };
};