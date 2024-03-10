import { IComment, IEvent } from '../types';

function handleEvents(event: IEvent) {
  const { type, data } = event;
}

export const moderationService = {
  handleEvents,
};
