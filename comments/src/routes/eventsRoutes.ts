import { FastifyInstance, FastifyRequest } from 'fastify';

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
      fastify.log.info({ eventType: request.body.type }, 'received event');

      reply.send({ status: 'OK' });
    }
  );
}

export default routes;
