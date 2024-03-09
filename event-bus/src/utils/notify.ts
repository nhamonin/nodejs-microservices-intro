import { IEvent } from '../types';

export async function notify(destination: string, event: IEvent) {
  return fetch(destination, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}
