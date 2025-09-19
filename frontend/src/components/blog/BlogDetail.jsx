import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      try {
        const blogRes = await api.get(`blog_posts/${id}/`);
        setBlog(blogRes.data);

        const commentsRes = await api.get(`comments/?post=${id}`);
        // Handle paginated or non-paginated response
        setComments(commentsRes.data.results || commentsRes.data);
      } catch (err) {
        toast.error("Failed to load blog or comments");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndComments();
  }, [id]);

 const handleComment = async (e) => {
  e.preventDefault();
  if (!comment.trim()) return toast.error("Comment cannot be empty!");
  try {
    const res = await api.post("comments/", { content: comment, post: id });
    setComments([...comments, res.data]);
    setComment("");
    toast.success("Comment added!");
  } catch (err) {
    console.log(err.response?.data);
    toast.error("Failed to add comment!");
  }
};


  const handleDeleteBlog = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`blog_posts/${id}/`);
      toast.success("Blog deleted!");
      navigate("/blogs");
    } catch {
      toast.error("Failed to delete blog!");
    }
  };

  const handleDeleteComment = async (cid) => {
    try {
      await api.delete(`comments/${cid}/`);
      setComments(comments.filter((c) => c.id !== cid));
      toast.success("Comment deleted!");
    } catch {
      toast.error("Failed to delete comment!");
    }
  };

  const handleEditComment = async (cid) => {
    if (!editingText.trim()) return toast.error("Comment cannot be empty!");
    try {
      const res = await api.put(`comments/${cid}/`, { content: editingText });
      setComments(comments.map(c => (c.id === cid ? res.data : c)));
      setEditingCommentId(null);
      toast.success("Comment updated!");
    } catch {
      toast.error("Failed to update comment!");
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading blog...</div>;
  }

  if (!blog) {
    return <div className="p-6 text-center text-red-500">Blog not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.image ? (
        <img src={blog.image} alt={blog.title} className="w-full rounded-xl mb-6" />
      ) : (
        <div className="h-64 w-full bg-gray-200 flex items-center justify-center text-gray-400 mb-6">
          No Image
        </div>
      )}
      <p className="text-gray-700 mb-6">{blog.content}</p>

      {user && blog.author === user.id && (
        <div className="flex gap-3 mb-6">
          <Link
            to={`/blog/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDeleteBlog}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-3">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500 mb-4">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-3 mb-4">
          {comments.map((c) => (
            <li key={c.id} className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              {editingCommentId === c.id ? (
                <div className="flex gap-2">
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleEditComment(c.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p>{c.content}</p>
                  <span className="text-xs text-gray-500">— {c.author_username}</span>
                  {user && c.author === user.id && (
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => {
                          setEditingCommentId(c.id);
                          setEditingText(c.content);
                        }}
                        className="text-blue-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={handleComment} className="mt-6 flex gap-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button className="px-4 py-2 bg-[#FFA0A0] text-white rounded hover:bg-[#e48080]">
            Post
          </button>
        </form>
      ) : (
        <p className="mt-3 text-gray-500">
    <Link to="/login" className="text-[#2F4F4F] font-semibold hover:underline">
      Login
    </Link> to comment.
  </p>
      )}
    </div>
  );
}
