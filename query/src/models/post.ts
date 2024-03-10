import { IPost } from '../types';
import { IComment } from '../types';

type PostWithComments = {
  post: IPost;
  comments: IComment[];
};

export const posts = new Map<string, PostWithComments>();
