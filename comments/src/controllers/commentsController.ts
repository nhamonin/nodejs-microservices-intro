import { FastifyRequest, FastifyReply } from 'fastify';

import { commentsService } from '../services/commentsService';

export async function getComments(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  const postId = request.params.id;
  const postsArray = commentsService.getAllComments(postId);

  reply.send(postsArray);
}

export async function createComment(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
    Body: {
      content: string;
    };
  }>,
  reply: FastifyReply
) {
  const { content } = request.body;
  const postId = request.params.id;
  const post = commentsService.createComment(postId, content);

  reply.code(201).send(post);
}
