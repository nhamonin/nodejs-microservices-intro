import server from './app';
import { queryService } from './services/queryService';

const start = async () => {
  try {
    await server.listen({ port: 5177, host: '0.0.0.0' });
    await queryService.syncEvents();
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
