import React, { useState } from "react";

const EditCommentModal = (props) => {
  const postId = props.postid;
  const commentId = props.commentid;

  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState(props.content);
  const [errors, setErrors] = useState(null);

  const toggleModal = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const refresh = () => {
    props.refresh(true);
  };

  const updateComment = async (e) => {
    e.preventDefault();
    try {
      let token = sessionStorage.getItem("token");
      if (!token) {
        alert("Must be signed in to leave comment");
      } else if (!postId || !commentId) {
        alert("Unable to update comment");
      } else {
        const res = await fetch(
          `http://localhost:3000/blog/posts/${postId}/comments/${commentId}`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              comment: content,
            }),
          }
        );
        let resJson = await res.json();

        if (res.status === 200) {
          if (resJson.errors) {
            setErrors(resJson.errors);
          }
          if (resJson.error) {
            alert(resJson.error);
          }
          if (resJson.message) {
            alert(resJson.message);
            setErrors(null);
            toggleModal();
            refresh();
          }
        } else {
          console.log("error occurred");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isActive) {
    return (
      <div className="icon is-medium">
        <i
          className="mdi mdi-24px mdi-pencil"
          onClick={() => toggleModal()}
        ></i>
      </div>
    );
  }

  return (
    <div>
      <div className="modal is-active">
        <div className="modal-background">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit Comment</p>
            <button className="delete" onClick={() => toggleModal()} />
          </header>
          <section className="modal-card-body">
            <div className="content">
              <form>
                <div className="field">
                  <label className="label">Comment</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className="button"
                        onClick={(e) => updateComment(e)}
                      >
                        Update
                      </button>
                      <button className="button" onClick={() => toggleModal()}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              {errors ? (
                <ul>
                  {errors.map((item, index) => (
                    <li key={index}>{item.msg}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
