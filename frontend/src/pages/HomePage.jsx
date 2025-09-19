// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import BlogList from "../components/blog/BlogList";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#2F4F4F] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Discover amazing articles, share your thoughts, and stay updated with
          the latest trends.
        </p>
        {user ? (
          <Link
            to="/blogs/create"
            className="inline-block px-6 py-3 bg-[#FFA0A0] text-[#2F4F4F] font-semibold rounded-lg hover:bg-pink-300 transition"
          >
            Create a Blog
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-[#FFA0A0] text-[#2F4F4F] font-semibold rounded-lg hover:bg-pink-300 transition"
          >
            Login to Create
          </Link>
        )}
      </section>

      {/* Blog Grid */}
      <main className="flex-grow py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
        <BlogList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
