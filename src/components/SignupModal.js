import React, { useState } from "react";

const SignupModal = () => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);
  const toggleModal = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const clickSignup = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://odin-blog-api.onrender.com/blog/sign-up", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          password_confirmation: confirmation,
          author: false,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        if (resJson.error) {
          setError(resJson.error);
        }
        if (resJson.errors) {
          setErrors(resJson.errors);
        }
        if (resJson.message) {
          setUsername("");
          setPassword("");
          setConfirmation("");
          setError(null);
          setErrors(null);
          toggleModal();
          alert(resJson.message);
        }
      } else {
        console.log("error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isActive) {
    return (
      <button className="button" onClick={() => toggleModal()}>
        Sign Up
      </button>
    );
  }

  return (
    <div>
      <div className="modal is-active">
        <div className="modal-background">
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Sign Up</p>
              <button className="delete" onClick={() => toggleModal()} />
            </header>
            <section className="modal-card-body">
              <div className="content">
                <form>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="e.g johnsmith"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="label">Password</div>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="label">Password Confirmation</div>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <p className="control">
                      <button
                        className="button"
                        onClick={(e) => clickSignup(e)}
                      >
                        Submit
                      </button>
                    </p>
                    <p className="control">
                      <button className="button" onClick={() => toggleModal()}>
                        Cancel
                      </button>
                    </p>
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
