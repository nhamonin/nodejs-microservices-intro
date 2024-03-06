import { FastifyRequest, FastifyReply } from 'fastify';

import { postService } from '../services/postService';
import { IPost } from '../types';

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
  const postsArray = postService.getAllPosts();

  reply.send(postsArray);
}

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const { title } = request.body as IPost;
  const post = postService.createNewPost(title);

  reply.code(201).send(post);
}
