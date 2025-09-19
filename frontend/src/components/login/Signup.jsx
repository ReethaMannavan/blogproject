// // import { useState, useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-hot-toast";
// // import api from "../../api/api";
// // import { AuthContext } from "../../context/AuthContext";
// // import Navbar from "../layout/Navbar";

// // export default function Signup() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ username: "", email: "", password: "" });
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       await api.post("/v1/register/", form);
// //       toast.success("Registration successful! Check your email.");
// //       navigate("/login");
// //     } catch (err) {
// //       if (err.response?.data) {
// //         const messages = Object.values(err.response.data).flat();
// //         messages.forEach((msg) => toast.error(msg));
// //       } else {
// //         toast.error("Registration failed!");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //     <Navbar/>
    
// //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#2F4F4F] to-[#FFA0A0]">
// //       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           Create Account
// //         </h2>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input
// //             type="text"
// //             name="username"
// //             placeholder="Username"
// //             value={form.username}
// //             onChange={handleChange}
// //             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#2F4F4F]"
// //             required
// //           />
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={form.email}
// //             onChange={handleChange}
// //             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#2F4F4F]"
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={form.password}
// //             onChange={handleChange}
// //             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#2F4F4F]"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full py-2 rounded-lg bg-[#2F4F4F] text-white font-semibold hover:bg-[#233333] transition"
// //           >
// //             {loading ? "Signing up..." : "Sign Up"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //     </>
// //   );
// // }


// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import api from "../../api/api";
// import Navbar from "../layout/Navbar";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("register/", form);
//       toast.success("Registration successful! Login now.");
//       navigate("/login");
//     } catch (err) {
//       if (err.response?.data) {
//         setErrors(err.response.data);
//       } else {
//         toast.error("Registration failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#2F4F4F] to-[#FFA0A0]">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
//           <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//             Create Account
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={form.username}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//                 required
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm mt-1">{errors.username}</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//                 required
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>
//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg"
//                 required
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 rounded-lg bg-[#2F4F4F] text-white font-semibold"
//             >
//               {loading ? "Signing up..." : "Sign Up"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/api";
import Navbar from "../layout/Navbar";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await api.post("register/", form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        toast.error("Registration failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#2F4F4F] to-[#FFA0A0]">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["username", "email", "password"].map(field => (
              <div key={field}>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#2F4F4F]"
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-[#2F4F4F] text-white font-semibold hover:bg-[#233333] transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
