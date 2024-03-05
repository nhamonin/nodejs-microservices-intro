import server from './app';

const start = async () => {
  try {
    await server.listen({ port: 8032 });
    console.log(`Server listening on port 8032`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
