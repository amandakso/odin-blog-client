import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          <div className="tile is-3 is-parent">
            {data.map(
              ({
                author,
                title,
                publish_date_formatted,
                updated,
                updated_formatted,
                _id,
              }) => (
                <div className="tile is-child box" key={_id}>
                  <p>{title}</p>
                  <p>By: {author.username}</p>
                  <p>{updated ? updated_formatted : publish_date_formatted}</p>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default Home;
