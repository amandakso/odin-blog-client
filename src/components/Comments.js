import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/blog/posts/${postId}/comments`,
          { mode: "cors" }
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let commentData = await response.json();
        setData(commentData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="content">
      <h1>Comments</h1>
      <form>
        <div className="field">
          <label className="label">New Comment: </label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Add a comment here."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button">Submit</button>
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();

                setNewComment("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {data ? (
        <div className="tile is-ancestor">
          {data.map(
            ({
              user,
              timestamp_formatted,
              updated,
              updated_formatted,
              content,
              _id,
            }) => (
              <div className="tile is-parent is-vertical" key={_id}>
                <div className="tile is-child box">
                  <p className="subtitle">By: {user.username}</p>
                  <p className="subtitle">
                    {updated
                      ? `Updated: ${updated_formatted}`
                      : `Posted: ${timestamp_formatted}`}
                  </p>
                  <p>{content}</p>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p>No Comments</p>
      )}
    </div>
  );
};

export default Comments;
