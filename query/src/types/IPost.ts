import { IComment } from './IComment';

export type IPost = {
  id: string;
  title: string;
};

export type IPostWithComments = IPost & { comments: IComment[] };
