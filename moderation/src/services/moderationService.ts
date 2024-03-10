import { IComment, IEvent } from '../types';

async function handleEvents(event: IEvent) {
  const { type, data } = event;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    const moderatedEvent = {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      },
    };

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
  return fetch('http://localhost:5176/events', {
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
