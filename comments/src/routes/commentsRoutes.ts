import { FastifyInstance } from 'fastify';

import { getComments, createComment } from '../controllers/commentsController';

async function routes(fastify: FastifyInstance) {
  fastify.get('/posts/:id/comments', getComments);
  fastify.post('/posts/:id/comments', createComment);
}

export default routes;
