import { randomBytes } from 'node:crypto';

import { comments } from '../models/comment';
import { IComment } from '../types';

function getAllComments(postId: string): IComment[] {
  return comments.get(postId) || [];
}

function createComment(postId: string, content: string): IComment[] {
  const commentId = randomBytes(4).toString('hex');

  const newComment = { id: commentId, content };

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
  return fetch('http://localhost:5176/events', {
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

export const commentsService = {
  getAllComments,
  createComment,
  notifyEventBus,
};
