import { FastifyRequest, FastifyReply } from 'fastify';

import { postService } from '../services/postService';
import { IEvent } from '../types';

export async function handleEvents(request: FastifyRequest, reply: FastifyReply) {
  const event = request.body as IEvent;

  await postService.handleEvents(event);

  reply.send({ status: 'OK' });
}
