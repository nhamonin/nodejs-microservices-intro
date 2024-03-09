import { randomBytes } from 'node:crypto';

import { posts } from '../models/post';
import { IPost } from '../types';

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

export const postService = {
  getAllPosts,
  createNewPost,
  notifyEventBus,
};
