import { FastifyInstance } from 'fastify';

import { getPosts, createPost } from '../controllers/postsController';

async function routes(fastify: FastifyInstance) {
  fastify.get('/posts', getPosts);
  fastify.post('/posts', createPost);
}

export default routes;
