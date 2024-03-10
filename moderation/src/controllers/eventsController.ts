import { FastifyRequest, FastifyReply } from 'fastify';

import { moderationService } from '../services/moderationService';
import { IEvent } from '../types';

export async function handleEvents(request: FastifyRequest, reply: FastifyReply) {
  moderationService.handleEvents(request.body as IEvent);

  reply.send({ status: 'OK' });
}
