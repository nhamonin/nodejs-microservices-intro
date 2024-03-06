import server from './app';

const port = 5174;

const start = async () => {
  try {
    await server.listen({ port });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
