import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import commentRoutes from './routes/commentsRoutes';

const server = fastify();

server.register(fastifyCors, {
  origin: '*',
});
server.register(commentRoutes);

export default server;
