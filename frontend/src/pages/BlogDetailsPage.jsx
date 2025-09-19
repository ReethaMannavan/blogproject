// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import BlogDetail from "../components/blog/BlogDetail";

const BlogDetailPage= () => {


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Blog Grid */}
      <main className="flex-grow py-12 px-6 max-w-6xl mx-auto">
      
        <BlogDetail />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
