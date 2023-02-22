import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllPosts = () => {
  const [data, setData] = useState(null);

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
      } catch (err) {
        alert(err.message);
        setData(null);
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
                <Link to={`/odin-blog-client/posts/${_id}`}>
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
