import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [refreshComments, setRefreshComments] = useState(true);
  const { postId } = useParams();

  const createComment = async (e) => {
    e.preventDefault();
    try {
      let token = sessionStorage.getItem("token");
      if (!token) {
        alert("Must be signed in to leave comment");
      } else {
        const res = await fetch(
          `http://localhost:3000/blog/posts/${postId}/comments`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              comment: newComment,
            }),
          }
        );
        let resJson = await res.json();

        if (res.status === 200) {
          if (resJson.errors) {
            setErrors(resJson.errors);
          }
          if (resJson.error) {
            setError(resJson.error);
          }
          if (resJson.message) {
            alert(resJson.message);
            setError(null);
            setErrors(null);
            setRefreshComments(true);
          }
        } else {
          console.log("error occurred");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    if (refreshComments) {
      getComments();
      setRefreshComments(false);
    }
  }, [postId, refreshComments]);

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
            <button className="button" onClick={(e) => createComment(e)}>
              Submit
            </button>
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
      {error ? <p>{error}</p> : null}
      {errors ? (
        <ul>
          {errors.map((item, index) => (
            <li key={index}>{item.msg}</li>
          ))}
        </ul>
      ) : null}
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
