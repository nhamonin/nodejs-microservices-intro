import { FastifyRequest, FastifyReply } from 'fastify';

import { queryService } from '../services/queryService';

export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
  const postsArray = queryService.getAllPostsWithComments();

  reply.send(postsArray);
}
