import server from './app';

const port = 5174;

const start = async () => {
  try {
    await server.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
