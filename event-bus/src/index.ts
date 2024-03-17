import server from './app';

const start = async () => {
  try {
    await server.listen({ port: 5176, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
