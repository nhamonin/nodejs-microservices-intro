import { useEffect, useState } from 'react';

type IComment = {
  id: string;
  content: string;
};

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`http://localhost:5175/posts/${postId}/comments`);
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, [postId]);

  return (
    <ul>
      {comments.map((comment: IComment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
