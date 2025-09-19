// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import { toast } from "react-hot-toast";
// import { AuthContext } from "../../context/AuthContext";

// export default function BlogEditForm() {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     api.get(`blog_posts/${id}/`).then((res) => {
//       if (res.data.author !== user.id) {
//         toast.error("You can only edit your own blog!");
//         navigate("/blogs");
//       } else {
//         setTitle(res.data.title);
//         setContent(res.data.content);
//       }
//     });
//   }, [id, user, navigate]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`blog_posts/${id}/`, { title, content });
//       toast.success("Blog updated!");
//       navigate(`/blog/${id}`);
//     } catch {
//       toast.error("Failed to update blog!");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-10 px-4">
//       <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
//       <form onSubmit={handleUpdate} className="bg-white p-6 shadow rounded-lg space-y-4">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2"
//           required
//         />
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2 h-40"
//           required
//         />
//         <button className="px-6 py-2 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#233333] transition">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }


import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function BlogEditForm() {
  const { id } = useParams();
  const { user, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get(`blog_posts/${id}/`).then((res) => {
      if (res.data.author !== user.id) {
        toast.error("You can only edit your own blog!");
        navigate("/blogs");
      } else {
        setTitle(res.data.title);
        setContent(res.data.content);
      }
    });
  }, [id, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await api.put(`blog_posts/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Blog updated!");
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to update blog!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 shadow rounded-lg space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 h-40"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="px-6 py-2 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#233333] transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
