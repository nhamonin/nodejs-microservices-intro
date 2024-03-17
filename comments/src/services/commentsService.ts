import { randomBytes } from 'node:crypto';

import server from '../app';
import { comments } from '../models/comment';
import { IComment, IEvent } from '../types';

function getAllComments(postId: string): IComment[] {
  return comments.get(postId) || [];
}

function createComment(postId: string, content: string): IComment[] {
  const commentId = randomBytes(4).toString('hex');

  const newComment = { id: commentId, content, status: 'pending' } as const;

  const postComments = comments.get(postId) || [];
  postComments.push(newComment);

  comments.set(postId, postComments);

  return comments.get(postId) || [];
}

async function notifyEventBus({
  type,
  data,
}: {
  type: string;
  data: IComment & { postId: string };
}) {
  return fetch('http://event-bus-srv:5176/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      data,
    }),
  });
}

async function handleEvents(event: IEvent) {
  const { type, data } = event;

  server.log.info({ event }, 'Received event');

  if (type === 'CommentModerated' && 'status' in data) {
    const { postId, id, status } = data;

    const postComments = comments.get(postId) || [];
    const comment = postComments.find((comment) => comment.id === id);

    if (comment) {
      comment.status = status;
    }

    comments.set(postId, postComments);

    await notifyEventBus({
      type: 'CommentUpdated',
      data,
    });
  }
}

export const commentsService = {
  getAllComments,
  createComment,
  notifyEventBus,
  handleEvents,
};
