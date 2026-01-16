import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import PostService from "../services/post.service";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    cover: "",
  });

  const [coverFile, setCoverFile] = useState(null); // เก็บไฟล์ใหม่
  const [coverPreview, setCoverPreview] = useState(""); // preview
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          const fetchedPost = response.data;
          if (fetchedPost.author._id !== userInfo?.id) {
            Swal.fire(
              "Error",
              "You are not allowed to edit this post",
              "error"
            );
            navigate("/");
            return;
          }
          setPost(fetchedPost);
          setCoverPreview(fetchedPost.cover || "");
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || error.message,
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, userInfo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title || !post.content) {
      Swal.fire("Error", "Title and Content are required", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("summary", post.summary);
      formData.append("content", post.content);
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      const response = await PostService.updatePost(id, formData);
      if (response.status === 200) {
        Swal.fire("Success", "Post updated successfully", "success").then(
          () => {
            navigate(`/post/${id}`);
          }
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || error.message,
        "error"
      );
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-purple-50 p-6 pt-20">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block font-semibold mb-2">Summary</label>
            <textarea
              name="summary"
              value={post.summary}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-semibold mb-2">Content</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
          </div>

          {/* Cover */}
          <div>
            <label className="block font-semibold mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-black"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover"
                className="mt-4 rounded-xl shadow-md w-full max-h-64 object-cover border border-gray-200"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
