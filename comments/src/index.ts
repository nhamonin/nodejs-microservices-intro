import server from './app';

const start = async () => {
  try {
    await server.listen({ port: 5175, host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
