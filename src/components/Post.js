import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments";

const Post = () => {
  const [data, setData] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `https://odin-blog-api.onrender.com/blog/posts/${postId}`,
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
    getPost();
  }, [postId]);
  return (
    <div className="post content">
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <h2>By: {data.author.username}</h2>
          {data.updated ? (
            <h3>Updated: {data.updated_formatted}</h3>
          ) : (
            <h3>Published: {data.publish_date_formatted}</h3>
          )}
          <p>{data.content}</p>
        </div>
      ) : (
        <p>Post Not Found</p>
      )}
      <Comments postId={postId} />
    </div>
  );
};

export default Post;
