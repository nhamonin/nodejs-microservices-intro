import { FastifyInstance } from 'fastify';

import { getPosts, createPost } from '../controllers/postsController';

async function routes(fastify: FastifyInstance) {
  fastify.get('/posts', getPosts);
  fastify.post('/posts/create', createPost);
}

export default routes;
