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
  const comments = commentsService.createComment(postId, content);

  await commentsService.notifyEventBus({
    type: 'CommentCreated',
    data: {
      postId,
      ...comments[comments.length - 1],
    },
  });

  reply.code(201).send(comments);
}
