import React, { useState } from "react";

const EditCommentModal = (props) => {
  const { postId } = props.postid;
  const { commentId } = props.commentid;

  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState(props.content);

  const toggleModal = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
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
                        onClick={(e) => console.log("TBD update comment")}
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
