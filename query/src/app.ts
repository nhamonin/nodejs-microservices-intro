import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import postsRoutes from './routes/postsRoutes';
import eventsRoutes from './routes/eventsRoutes';

const server = fastify({
  logger: {
    level: 'info',
  },
});

server.register(fastifyCors, {
  origin: '*',
});
server.register(postsRoutes);
server.register(eventsRoutes);

export default server;
