import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/blog/posts/${postId}`,
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
        console.log(postData);
        setData(postData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postId]);
  return (
    <div className="content">
      <h1>{data.title}</h1>
      <h2>By: {data.author.username}</h2>
      {data.updated ? (
        <h3>Updated: {data.updated_formatted}</h3>
      ) : (
        <h3>Published: {data.publish_date_formatted}</h3>
      )}

      <p>{data.content}</p>
    </div>
  );
};

export default Post;
