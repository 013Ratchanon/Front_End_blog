import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import { UserContext } from "../context/UserContext.jsx";

const PostDetail = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          const data = response.data;

          // ⭐ ป้องกัน field ไม่ตรง
          setPost({
            ...data,
            content: data.content || data.body || "",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          icon: "error",
          text: error?.response?.data?.message || error?.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!userInfo || userInfo.id !== post.author?._id) {
      Swal.fire("Error", "You are not allowed to delete this post", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Post",
      text: "Are you sure you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await PostService.deletePost(id);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        window.location.href = "/";
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || error.message,
          "error"
        );
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!post) return <div className="text-center mt-10">Post not found</div>;

  return (
    <div className="post-page min-h-full flex items-center justify-center p-4 pt-20">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>

        <div className="text-gray-600 mb-6 text-center">
          <time className="block mb-2">
            {new Date(post.createdAt).toLocaleString()}
          </time>

          <div className="author mb-2">
            By{" "}
            <a
              href={`/author/${post.author?._id}`}
              className="text-blue-500 font-semibold"
            >
              @{post.author?.username}
            </a>
          </div>

          {userInfo?.id === post.author?._id && (
            <div className="flex justify-center gap-2 mt-4">
              <a href={`/edit/${post._id}`} className="btn btn-warning">
                Edit
              </a>
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>

        {/* ⭐ แสดง content ให้ขึ้นแน่นอน */}
        {post.content ? (
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-center text-gray-400">ไม่มีเนื้อหา</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
