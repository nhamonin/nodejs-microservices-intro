import { FastifyInstance } from 'fastify';

import { getAllPosts } from '../controllers/postsController';

async function routes(fastify: FastifyInstance) {
  fastify.get('/posts', getAllPosts);
}

export default routes;
