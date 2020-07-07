import {config} from '../config/config';
import {buildApp} from './app';
import {createServices} from '../core/createServices';

export const startServer = async () => {
  const services = createServices(config);
  const app = buildApp(services);


  await services.db.migrate.latest();

  const server = app.listen(config.port, () => console.log(`Server listening on ${config.port}`));

  return async function stopServer() {
    server.close();
    await services.db.destroy();
  };
};

if (require.main === module) {
  startServer().catch(console.error);
}
