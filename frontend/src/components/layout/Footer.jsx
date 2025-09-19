import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#2F4F4F] text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/blogs" className="hover:text-[#FFA0A0] transition">
            Blogs
          </Link>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-[#FFA0A0] transition"
          >
            Twitter
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="hover:text-[#FFA0A0] transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
