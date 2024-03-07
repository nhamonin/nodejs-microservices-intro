import { useState, useEffect } from 'react';

import CommentCreate from './CommentCreate';

type IPost = {
  id: string;
  title: string;
};

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5174/posts');
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
