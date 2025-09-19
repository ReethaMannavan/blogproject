// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { toast } from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";

// export default function BlogForm() {
//   const { user } = useContext(AuthContext);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();

//   if (!user) return <p className="p-6">Login to create a blog.</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (image) formData.append("image", image);

//     try {
//       await api.post("blog_posts/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Blog created successfully!");
//       navigate("/blogs");
//     } catch {
//       toast.error("Failed to create blog!");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-10 px-4">
//       <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2"
//           required
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2 h-40"
//           required
//         />
//         <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
//         <button className="px-6 py-2 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#233333] transition">
//           Publish Blog
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function BlogForm() {
  const { user, accessToken } = useContext(AuthContext); // make sure accessToken is available
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  if (!user) return <p className="p-6">Login to create a blog.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await api.post("blog_posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // send JWT token
        },
      });
      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to create blog! Check console for details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-40"
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button className="px-6 py-2 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#233333] transition">
          Publish Blog
        </button>
      </form>
    </div>
  );
}

