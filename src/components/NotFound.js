import React from "react";
import { Link } from "react-router-dom";

import error from "../assets/error.jpg";

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <img src={error} alt="Sad face drawn on an egg in an egg carton" />;
      <p>
        Photo by{" "}
        <a href="https://unsplash.com/@helloimnik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Nik
        </a>{" "}
        on <a href="https://unsplash.com/photos/LUYD2b7MNrg">Unsplash</a>
      </p>
      <p>
        Return home{" "}
        <Link className="here" to={"/odin-blog-client/"}>
          HERE
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
