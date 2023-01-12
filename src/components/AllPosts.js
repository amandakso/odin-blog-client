import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllPosts = () => {
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
    <div className="content">
      <h1>All Posts</h1>
      {data ? (
        <ul>
          {data.map(
            ({
              author,
              title,
              publish_date_formatted,
              updated,
              updated_formatted,
              _id,
            }) => (
              <li key={_id}>
                <Link to={`/posts/${_id}`}>
                  {title} By: {author.username}{" "}
                  {updated
                    ? `Updated: ${updated_formatted}`
                    : `Published ${publish_date_formatted}`}
                </Link>
              </li>
            )
          )}
        </ul>
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default AllPosts;
