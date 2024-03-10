import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import eventBusRoutes from './routes/eventBusRoutes';

const server = fastify({
  logger: {
    level: 'info',
  },
});

server.register(fastifyCors, {
  origin: '*',
});
server.register(eventBusRoutes);

export default server;
