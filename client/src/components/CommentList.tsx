import { IComment } from '../types';

const CommentList = ({ comments }: { comments: IComment[] }) => {
  const getContentByStatus = (comment: IComment): string => {
    let content = '';

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'pending':
        content = 'This comment is awaiting moderation';
        break;
      case 'rejected':
        content = 'This comment has been rejected';
        break;
      default:
        break;
    }

    return content;
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{getContentByStatus(comment)}</li>
      ))}
    </ul>
  );
};

export default CommentList;
