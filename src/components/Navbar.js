import React, { useState, useEffect } from "react";

const Navbar = () => {
  const toggleBurgerMenu = () => {
    document.querySelector(".navbar-menu").classList.toggle("is-active");
    document.querySelector(".navbar-burger").classList.toggle("is-active");
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
          <a className="navbar-item">Home</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item">Posts</a>
          <div className="buttons navbar-item">
            <a className="button">
              <strong>Sign up</strong>
            </a>
            <a className="button">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
