import { FastifyRequest, FastifyReply } from 'fastify';

import { moderationService } from '../services/moderationService';
import { IEvent } from '../types';

export async function handleEvents(request: FastifyRequest, reply: FastifyReply) {
  const event = request.body as IEvent;

  await moderationService.handleEvents(event);

  reply.send({ status: 'OK' });
}
