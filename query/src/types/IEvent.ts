import { IPost, IComment } from './index';

export type IEvent = {
  type: string;
  data: IPost | IComment;
};
