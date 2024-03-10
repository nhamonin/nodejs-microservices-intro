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

  if (type === 'CommentUpdated') {
    const comment = data as IComment & { postId: string };
    const postWithComments = posts.get(comment.postId);

    if (!postWithComments) return;

    const commentToUpdate = postWithComments.comments.find((c) => c.id === comment.id);

    if (!commentToUpdate) return;

    commentToUpdate.status = comment.status;
    commentToUpdate.content = comment.content;
  }
}

function getAllPostsWithComments() {
  return Array.from(posts.values());
}

async function syncEvents() {
  const events = await fetch('http://localhost:5176/events');

  if (!events.ok) {
    throw new Error('Error fetching events');
  }

  const parsedEvents = await events.json();

  parsedEvents.forEach(handleEvents);
}

export const queryService = {
  handleEvents,
  getAllPostsWithComments,
  syncEvents,
};
