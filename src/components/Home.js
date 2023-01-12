import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const allPostsPage = () => {
    navigate("/posts");
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/blog/posts`, {
          mode: "cors",
        });
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
              <div className="tile is-parent is-3">
                <div className="tile is-child box" key={_id}>
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
