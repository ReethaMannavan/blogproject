// import { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-[#2F4F4F] text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold">
//             MyBlog
//           </Link>

//           {/* Desktop Links */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link to="/blogs" className="hover:text-[#FFA0A0] transition">
//               Blogs
//             </Link>
//             {user ? (
//               <>
//                 <span className="font-medium">{user.username}</span>
//                 <Link
//                   to="/blogs/create"
//                   className="bg-[#FFA0A0] px-3 py-1 rounded hover:bg-[#e48080] transition"
//                 >
//                   Create Blog
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="hover:text-[#FFA0A0] transition"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="hover:text-[#FFA0A0] transition"
//                 >
//                   Signup
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-[#2F4F4F] px-4 pt-2 pb-4 space-y-1">
//           <Link to="/blogs" className="block hover:text-[#FFA0A0] transition">
//             Blogs
//           </Link>
//           {user ? (
//             <>
//               <span className="block">{user.username}</span>
//               <Link
//                 to="/blogs/create"
//                 className="block bg-[#FFA0A0] px-3 py-1 rounded hover:bg-[#e48080] transition"
//               >
//                 Create Blog
//               </Link>
//               <button
//                 onClick={logout}
//                 className="block bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition w-full text-left"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="block hover:text-[#FFA0A0] transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="block hover:text-[#FFA0A0] transition"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }


import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#2F4F4F] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link to="/" className="text-2xl font-bold">MyBlog</Link>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/blogs" className="hover:text-[#FFA0A0] transition">Blogs</Link>
          {user ? (
            <>
              <span>{user.username}</span>
              <Link to="/blogs/create" className="bg-[#FFA0A0] px-3 py-1 rounded hover:bg-[#e48080]">Create Blog</Link>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#FFA0A0] transition">Login</Link>
              <Link to="/signup" className="hover:text-[#FFA0A0] transition">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
