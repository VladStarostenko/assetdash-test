import express from 'express';

export const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.get('/', (_, res) => res.send('Hello assetdash!'));
  return app;
};
