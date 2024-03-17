import fetchRetry from 'fetch-retry';

import server from '../app';
import { posts } from '../models/post';
import { IEvent } from '../types';

function handleEvents(event: IEvent) {
  const { type, data } = event;

  server.log.info({ event }, 'Received event');

  if (type === 'PostCreated' && 'title' in data) {
    const post = data;

    posts.set(post.id, { ...post, comments: [] });
  }

  if (type === 'CommentCreated' && 'postId' in data) {
    const comment = data;
    const postWithComments = posts.get(comment.postId);
    const { postId, ...commentWithoutPostId } = comment;

    if (!postWithComments) return;

    postWithComments.comments.push(commentWithoutPostId);
  }

  if (type === 'CommentUpdated' && 'postId' in data) {
    const comment = data;
    const postWithComments = posts.get(comment.postId);

    if (!postWithComments) return;

    const commentToUpdate = postWithComments.comments.find((c) => c.id === comment.id);

    if (!commentToUpdate) return;

    commentToUpdate.status = comment.status;
    commentToUpdate.content = comment.content;
  }
}

function getAllPostsWithComments() {
  return Array.from(posts.values());
}

async function syncEvents() {
  const events = await fetchRetry(global.fetch)('http://event-bus-srv:5176/events', {
    retries: 5,
    retryDelay: 1000,
  });

  if (!events.ok) {
    throw new Error('Error fetching events');
  }

  const parsedEvents = await events.json();

  parsedEvents.forEach(handleEvents);
}

export const queryService = {
  handleEvents,
  getAllPostsWithComments,
  syncEvents,
};
