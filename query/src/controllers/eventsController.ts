import { FastifyRequest, FastifyReply } from 'fastify';

import { queryService } from '../services/queryService';
import { IEvent } from '../types';

export async function handleEvents(request: FastifyRequest, reply: FastifyReply) {
  queryService.handleEvents(request.body as IEvent);

  reply.send({ status: 'OK' });
}
