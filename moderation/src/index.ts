import server from './app';

const port = 5178;

const start = async () => {
  try {
    await server.listen({ port });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
