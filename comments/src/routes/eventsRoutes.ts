import { FastifyInstance, FastifyRequest } from 'fastify';

import { IEvent } from '../types';
import { commentsService } from '../services/commentsService';

async function routes(fastify: FastifyInstance) {
  fastify.post(
    '/events',
    async (
      request: FastifyRequest<{
        Body: {
          type: string;
        };
      }>,
      reply
    ) => {
      const event = request.body as IEvent;

      await commentsService.handleEvents(event);

      reply.send({ status: 'OK' });
    }
  );
}

export default routes;
