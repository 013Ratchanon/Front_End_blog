import React, { useState, useRef } from "react";
import PostService from "../services/post.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Editor from "../components/Editor.jsx";

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const [post, setPost] = useState({
    title: "",
    author: "",
    summary: "",
    content: "",
    file: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPost({ ...post, [name]: e.targer.files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handlecontentChange = (value) => {
    setContent(value);
    setPost({ ...post, content: content });
  };

  const resetForm = () => {
    setPost({
      title: "",
      author: "",
      summary: "",
      content: "",
      file: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกัน form reload

    try {
      const data = new FormData();
      data.append("title", post.title);
      data.append("summary", post.summary);
      data.append("content", post.content);
      data.append("file", post.file); // หรือ post.file ถ้าเก็บไฟล์แยก
      // data.append("file", post.file);

      const res = await PostService.createPost(data); // เรียก API จริง

      if (res.status === 201 || res.status === 200) {
        await Swal.fire({
          title: "Add new post",
          text: "Post created successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Add new post",
        text: error.response?.data?.message || "Request failed",
        icon: "error",
      });
      console.error("Create post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-6xl">
        <div className="card bg-gray-800 shadow-2xl rounded-xl border border-gray-700">
          <div className="card-body p-10">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-white">
              Create New Post
            </h1>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* LEFT: COVER IMAGE */}
              <div className="md:col-span-1 flex flex-col items-center">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Cover Image URL
                  </span>
                </label>
                <input
                  type="file"
                  name="file"
                  value={post.file}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full text-white border-gray-600 bg-gray-700 placeholder-gray-400"
                />

                <div className="mt-6 w-full">
                  <span className="font-semibold text-white mb-2 block">
                    Preview
                  </span>
                  <img
                    src={
                      post.file ||
                      "https://vaultproducts.ca/cdn/shop/products/4454FC90-DAF5-43EF-8ACA-A1FF04CE802D.jpg?v=1656626547"
                    }
                    alt="file preview"
                    className="rounded-xl shadow-md object-cover h-64 w-full border border-gray-600"
                  />
                </div>
              </div>

              {/* RIGHT: FORM FIELDS */}
              <div className="md:col-span-2 grid grid-cols-1 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-white">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    className="input input-bordered w-full text-white border-gray-600 bg-gray-700 placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold text-white">
                      Summary
                    </span>
                  </label>
                  <textarea
                    name="summary"
                    value={post.summary}
                    onChange={handleChange}
                    placeholder="Short summary..."
                    className="textarea textarea-bordered w-full text-white border-gray-600 bg-gray-700 placeholder-gray-400"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="label">
                    <div className="font-semibold text-white mb-2">Content</div>
                    <div className="h-64">
                      <Editor
                        value={content}
                        onChange={handlecontentChange}
                        ref={editorRef}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="md:col-span-3 flex justify-center gap-6 mt-8">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-600 rounded-xl text-white font-semibold hover:bg-gray-500 transition"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 rounded-xl text-white font-semibold hover:bg-indigo-500 transition"
                  onClick={handleSubmit}
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
