import server from '../app';
import { IComment, IEvent } from '../types';

async function handleEvents(event: IEvent) {
  const { type, data } = event;

  server.log.info({ event }, 'Received event');

  if (type === 'CommentCreated' && 'content' in data) {
    const status: 'rejected' | 'approved' = data.content.includes('orange')
      ? 'rejected'
      : 'approved';
    const moderatedEvent = {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    } as const;

    await notifyEventBus(moderatedEvent);
  }
}

async function notifyEventBus({
  type,
  data,
}: {
  type: string;
  data: IComment & { postId: string };
}) {
  return fetch('http://event-bus-srv:5176/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      data,
    }),
  });
}

export const moderationService = {
  handleEvents,
};
