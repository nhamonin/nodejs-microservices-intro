import { FastifyRequest, FastifyReply } from 'fastify';

import { eventsService } from '../services/eventsService';
import { IEvent } from '../types';

export async function handleEvents(request: FastifyRequest, reply: FastifyReply) {
  const event = request.body as IEvent;

  await eventsService.handleEvents(event);

  reply.code(200).send({ status: 'OK' });
}
