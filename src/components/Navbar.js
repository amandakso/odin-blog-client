import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const toggleBurgerMenu = () => {
    document.querySelector(".navbar-menu").classList.toggle("is-active");
    document.querySelector(".navbar-burger").classList.toggle("is-active");
  };

  const updateUser = (currentUser) => {
    setUser(currentUser);
  };

  const logoutUser = async () => {
    let token = sessionStorage.getItem("token");
    console.log(token);
    try {
      let res = await fetch("http://localhost:3000/blog/logout", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      let resJson = await res.json();
      console.log("Message" + resJson.msg);
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      updateUser(null);
      alert(resJson.msg);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar" role="navigation" aria-label="dropdown navigation">
      <div className="navbar-brand">
        <button className="navbar-item">BLOG</button>
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
          <Link to={"/"} className="navbar-item">
            Home
          </Link>
          <Link to={"/posts"} className="navbar-item">
            Posts
          </Link>
        </div>
        {user ? (
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-item">{user}</div>
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
              <LoginModal updateUser={updateUser} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
