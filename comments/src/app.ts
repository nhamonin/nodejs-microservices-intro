import fastify from 'fastify';

import commentRoutes from './routes/commentsRoutes';

const server = fastify();

server.register(commentRoutes);

export default server;
