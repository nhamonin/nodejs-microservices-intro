import { notify } from '../utils/notify';
import { events } from '../models/event';
import { SERVICES_TO_NOTIFY } from '../config/config';
import { IEvent } from '../types';

async function handleEvents(event: IEvent) {
  const servicesKeys = Object.keys(SERVICES_TO_NOTIFY) as Array<keyof typeof SERVICES_TO_NOTIFY>;
  const destinationURLs = servicesKeys.map((service) => SERVICES_TO_NOTIFY[service]);

  try {
    await Promise.all(destinationURLs.map((destination) => notify(destination, event)));
  } catch (err) {
    console.error(err);
  } finally {
    events.push(event);
  }
}

function getEvents() {
  return events;
}

export const eventsService = {
  handleEvents,
  getEvents,
};
