import { FastifyInstance } from 'fastify';

import { handleEvents } from '../controllers/eventsController';

async function routes(fastify: FastifyInstance) {
  fastify.post('/events', handleEvents);
}

export default routes;
