import { notify } from '../utils/notify';
import { IEvent } from '../types';

async function handleEvents(event: IEvent) {
  console.log('Received event:', event.type);

  try {
    await Promise.all([
      notify('http://localhost:5174/events', event), // posts service
      notify('http://localhost:5175/events', event), // comments service
      notify('http://localhost:5177/events', event), // query service
    ]);
  } catch (err) {
    console.error(err);
  }
}

export const eventsService = {
  handleEvents,
};
