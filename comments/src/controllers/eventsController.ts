import { FastifyRequest, FastifyReply } from 'fastify';

import { commentsService } from '../services/commentsService';
import { IEvent } from '../types';

export async function handleEvents(request: FastifyRequest, reply: FastifyReply) {
  const event = request.body as IEvent;

  await commentsService.handleEvents(event);

  reply.send({ status: 'OK' });
}
