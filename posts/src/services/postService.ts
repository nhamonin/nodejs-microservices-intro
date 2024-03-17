import { randomBytes } from 'node:crypto';

import server from '../app';
import { posts } from '../models/post';
import { IEvent, IPost } from '../types';

function getAllPosts(): IPost[] {
  return Array.from(posts.values());
}

function createNewPost(title: string): IPost {
  const id = randomBytes(4).toString('hex');
  const newPost = { id, title };
  posts.set(id, newPost);

  return newPost;
}

async function notifyEventBus({ type, data }: { type: string; data: IPost }) {
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
  server.log.info({ event }, 'Received event');
}

export const postService = {
  getAllPosts,
  createNewPost,
  notifyEventBus,
  handleEvents,
};
