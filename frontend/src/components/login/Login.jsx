// // src/components/auth/Login.jsx
// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../../api/api";
// import { AuthContext } from "../../context/AuthContext";
// import Navbar from "../layout/Navbar";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});

//     if (!form.username) setErrors((prev) => ({ ...prev, username: "Username required" }));
//     if (!form.password) setErrors((prev) => ({ ...prev, password: "Password required" }));
//     if (!form.username || !form.password) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await api.post("v1/token/", {
//         username: form.username,
//         password: form.password,
//       });
//       login(res.data.access, res.data.refresh); // save tokens and user context
//       navigate("/blogs");
//     } catch (err) {
//       setErrors({ general: "Invalid username or password" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#FFA0A0] to-[#2F4F4F]">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
//           <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

//           {errors.general && <p className="text-red-500 mb-3">{errors.general}</p>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={form.username}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#FFA0A0]"
//               />
//               {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//             </div>

//             <div>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#FFA0A0]"
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 rounded-lg bg-[#FFA0A0] text-white font-semibold hover:bg-[#e48080] transition"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="mt-4 text-center text-gray-600">
//             Don't have an account? <Link to="/signup" className="text-[#2F4F4F] font-semibold">Sign Up</Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../layout/Navbar";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
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
      const res = await api.post("token/", form);
      await login(res.data.access, res.data.refresh);
      toast.success("Login successful!");
      navigate("/blogs");
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        toast.error("Invalid credentials!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#FFA0A0] to-[#2F4F4F]">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#FFA0A0]"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#FFA0A0]"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-[#FFA0A0] text-white font-semibold hover:bg-[#e48080] transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
