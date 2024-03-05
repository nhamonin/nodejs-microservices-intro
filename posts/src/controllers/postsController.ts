import { randomBytes } from 'node:crypto';
import { FastifyRequest, FastifyReply } from 'fastify';

import { IPost } from '../types';
import { posts } from '../models/post';

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  const postsArray = Array.from(posts.values());
  reply.send(postsArray);
}

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const { title } = request.body as IPost;
  const id = randomBytes(4).toString('hex');

  posts.set(id, { id, title });

  reply.code(201).send(posts.get(id));
}
