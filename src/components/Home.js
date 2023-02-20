import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Post from "./Post";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const allPostsPage = () => {
    navigate("/posts");
  };

  const postPage = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `https://odin-blog-api.onrender.com/blog/posts`,
          {
            mode: "cors",
          }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let postData = await response.json();
        setData(postData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);
  return (
    <div>
      <h1>Posts</h1>
      {data ? (
        <div className="tile is-ancestor">
          {data.map(
            ({
              author,
              title,
              publish_date_formatted,
              updated,
              updated_formatted,
              _id,
            }) => (
              <div
                className="tile is-parent is-3"
                key={_id}
                onClick={() => postPage(_id)}
              >
                <div className="tile is-child box">
                  <p className="title">{title}</p>
                  <p className="subtitle">By: {author.username}</p>
                  <p className="subtitle">
                    {updated ? updated_formatted : publish_date_formatted}
                  </p>
                </div>
              </div>
            )
          )}
          <div className="tile is-parent is-3" onClick={allPostsPage}>
            <div className="tile is-child box">
              <p>See All Posts...</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default Home;
