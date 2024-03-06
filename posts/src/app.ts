import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import postRoutes from './routes/postsRoutes';

const server = fastify();

server.register(fastifyCors, {
  origin: '*',
});
server.register(postRoutes);

export default server;
