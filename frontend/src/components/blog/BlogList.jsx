// // src/components/blog/BlogList.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/api";

// export default function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("blog_posts/") // relative path, baseURL handles /api/v1/
//       .then((res) => setBlogs(res.data.results || res.data))
//       .catch(() => console.error("Failed to load blogs"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         Loading blogs...
//       </div>
//     );
//   }

//   if (!blogs.length) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         No blogs found. Create the first one!
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
//       {blogs.map((blog) => (
//         <div
//           key={blog.id}
//           className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
//         >
//           {blog.image ? (
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="h-48 w-full object-cover"
//             />
//           ) : (
//             <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
//           <div className="p-5 flex flex-col flex-1">
//             <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
//               {blog.title}
//             </h2>
//             <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
//               {blog.content.slice(0, 120)}...
//             </p>
//             <Link
//               to={`/blog/${blog.id}`}
//               className="mt-auto text-[#2F4F4F] font-semibold hover:underline"
//             >
//               Read More →
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// src/components/blog/BlogList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import Pagination from "./Pagination";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const PAGE_SIZE = 3; // must match settings.py PAGE_SIZE

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blog_posts/?page=${page}`)
      .then((res) => {
        setBlogs(res.data.results);
        setCount(res.data.count); // total items
      })
      .catch(() => console.error("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading blogs...
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No blogs found. Create the first one!
      </div>
    );
  }

  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
  <>
    <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
              {blog.content.slice(0, 120)}...
            </p>
            <Link
              to={`/blog/${blog.id}`}
              className="mt-auto text-[#2F4F4F] font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>

    {/* Render Pagination */}
    <Pagination page={page} setPage={setPage} totalPages={totalPages} />
  </>
);

}
