import React, { useState } from "react";

const LoginModal = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleModal = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  if (!isActive) {
    return (
      <button className="button" onClick={() => toggleModal()}>
        Log In
      </button>
    );
  }

  return (
    <div>
      <div className="modal is-active">
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Login</p>
              <button className="delete" onClick={() => toggleModal()} />
            </header>
            <section className="modal-card-body">
              <div className="content">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g johnsmith"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="label">Password</div>
                  <div className="control">
                    <input className="input" type="password" />
                  </div>
                </div>
                <div className="field is-grouped">
                  <p className="control">
                    <button className="button">Submit</button>
                  </p>
                  <p className="control">
                    <button className="button" onClick={() => toggleModal()}>
                      Cancel
                    </button>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
