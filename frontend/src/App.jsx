import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import ScrollToTop from "./components/scroll/ScrollToTop";

import { Toaster } from "react-hot-toast";
import Signup from "./components/login/Signup";
import Login from "./components/login/Login";
import BlogForm from "./components/blog/BlogForm";
import BlogEditForm from "./components/blog/BlogEditForm";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailsPage";
import BlogPage from "./pages/BlogPage";
import BlogEditPage from "./pages/BlogEditPage";
import BlogFormPage from "./pages/BlogFormPage";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen font-roboto">
          <main>
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
           
              <Route path="/" element={<HomePage/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
            
              <Route path="/blogs/create" element={<BlogFormPage/>} />
              <Route path="/blog/:id/edit" element={<BlogEditPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
