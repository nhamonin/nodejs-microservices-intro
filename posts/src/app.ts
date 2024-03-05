import fastify from 'fastify';

import postRoutes from './routes/postsRoutes';

const server = fastify();

server.register(postRoutes);

export default server;
