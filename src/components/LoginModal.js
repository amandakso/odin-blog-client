import React, { useState } from "react";

const LoginModal = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const toggleModal = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const updateUser = (currentUser) => {
    props.updateUser(currentUser);
  };

  const clickLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/blog/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        if (resJson.error) {
          setError(resJson.error);
        }
        if (resJson.message) {
          setMessage(resJson.message);
        }

        if (resJson.token) {
          setUsername("");
          setPassword("");
          sessionStorage.setItem("token", resJson.token);
          updateUser(resJson.username);
          alert(`Welcome ${resJson.username}!`);
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
                <form>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={username}
                        placeholder="e.g johnsmith"
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
                  <div className="field is-grouped">
                    <p className="control">
                      <button className="button" onClick={(e) => clickLogin(e)}>
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
                {message ? <p>{message}</p> : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
