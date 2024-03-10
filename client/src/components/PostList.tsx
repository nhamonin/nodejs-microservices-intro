import { useState, useEffect } from 'react';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { IComment } from '../types';

type IPost = {
  id: string;
  title: string;
  comments: IComment[];
};

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5177/posts');
    const data = await res.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {posts.map((post: IPost) => (
        <div className="card" key={post.id} style={{ width: '30%', marginBottom: '20px' }}>
          <div className="card-body">
            <h3>{post.title}</h3>

            <CommentCreate postId={post.id} />
            <CommentList comments={post.comments} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
