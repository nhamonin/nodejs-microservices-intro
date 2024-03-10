import server from './app';
import { queryService } from './services/queryService';

const port = 5177;

const start = async () => {
  try {
    await server.listen({ port });
    await queryService.syncEvents();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
