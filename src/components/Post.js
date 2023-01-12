import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams();
  return (
    <div>
      <h1>{postId}</h1>
    </div>
  );
};

export default Post;
