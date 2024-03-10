import { FastifyInstance } from 'fastify';

import { handleEvents, getEvents } from '../controllers/eventsController';

async function routes(fastify: FastifyInstance) {
  fastify.get('/events', getEvents);
  fastify.post('/events', handleEvents);
}

export default routes;
