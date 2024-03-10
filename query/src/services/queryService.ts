import { posts } from '../models/post';
import { IComment, IEvent, IPost } from '../types';

function handleEvents(event: IEvent) {
  const { type, data } = event;

  if (type === 'PostCreated') {
    const post = data as IPost;

    posts.set(post.id, { ...post, comments: [] });
  }

  if (type === 'CommentCreated') {
    const comment = data as IComment & { postId: string };
    const postWithComments = posts.get(comment.postId);
    const { postId, ...commentWithoutPostId } = comment;

    if (!postWithComments) return;

    postWithComments.comments.push(commentWithoutPostId);
  }
}

function getAllPostsWithComments() {
  return Array.from(posts.values());
}

export const queryService = {
  handleEvents,
  getAllPostsWithComments,
};
