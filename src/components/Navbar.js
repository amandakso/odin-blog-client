import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState("");
  const toggleBurgerMenu = () => {
    document.querySelector(".navbar-menu").classList.toggle("is-active");
    document.querySelector(".navbar-burger").classList.toggle("is-active");
  };

  const updateUsername = (currentUser) => {
    setUsername(currentUser);
  };

  const updateUser = () => {
    setUser(true);
  };

  const loginGuest = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://odin-blog-api.onrender.com/blog/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: process.env.REACT_APP_GUEST_USER,
          password: process.env.REACT_APP_GUEST_PWD,
        }),
      });
      let resJson = await res.json();

      if (res.status === 200) {
        if (resJson.error) {
          alert(resJson.error);
        }
        if (resJson.message) {
          alert(resJson.message);
        }
        if (resJson.token) {
          sessionStorage.setItem("token", resJson.token);
          updateUsername(resJson.username);
          updateUser(true);
          alert(`Welcome ${resJson.username}!`);
        }
      } else {
        console.log("error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let currentUser = sessionStorage.getItem("token");
    if (currentUser) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const logoutUser = async () => {
    let token = sessionStorage.getItem("token");
    try {
      let res = await fetch("https://odin-blog-api.onrender.com/blog/logout", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      let resJson = await res.json();
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      setUser(false);
      setUsername("");
      alert(resJson.msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar" role="navigation" aria-label="dropdown navigation">
      <div className="navbar-brand">
        <div className="navbar-item">BLOG</div>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenuItems"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenuItems" className="navbar-menu">
        <div className="navbar-start">
          <Link to={"/odin-blog-client/"} className="navbar-item">
            Home
          </Link>
          <Link to={"/odin-blog-client/posts"} className="navbar-item">
            Posts
          </Link>
        </div>
        {user ? (
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-item">{username}</div>
              <div className="navbar-dropdown is-right">
                <div className="navbar-item">
                  <button className="button" onClick={() => logoutUser()}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="buttons navbar-item">
              <SignupModal />
              <LoginModal
                updateUser={updateUser}
                updateUsername={updateUsername}
              />
              <button className="button" onClick={(e) => loginGuest(e)}>
                Guest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
