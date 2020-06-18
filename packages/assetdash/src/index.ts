import {config} from './config';
import {buildApp} from './app';

export const startServer = async () => {
  const app = buildApp();

  const server = app.listen(config.port, () => console.log(`Server listening on ${config.port}`));

  return async function stopServer() {
    server.close();
  };
};

if (require.main === module) {
  startServer().catch(console.error);
}
