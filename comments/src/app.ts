import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import commentRoutes from './routes/commentsRoutes';
import eventsRoutes from './routes/eventsRoutes';

const server = fastify({
  logger: {
    level: 'info',
  },
});

server.register(fastifyCors, {
  origin: '*',
});
server.register(commentRoutes);
server.register(eventsRoutes);

export default server;
