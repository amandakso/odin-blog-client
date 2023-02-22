import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AllPosts from "./components/AllPosts";
import Post from "./components/Post";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/odin-blog-client/" element={<Home />} />
          <Route path="/odin-blog-client/posts" element={<AllPosts />} />
          <Route path="/odin-blog-client/posts/:postId" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
