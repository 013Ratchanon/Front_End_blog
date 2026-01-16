// src/components/BlogCard.jsx
import React from "react";

const BlogCard = ({
  post,
  index,
  isLoggedIn,
  onEdit,
  onDelete,
  onView,
  onAuthor,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden
      transition transform hover:shadow-2xl hover:-translate-y-1 duration-300
      ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
    >
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover md:rounded-l-2xl md:rounded-r-none rounded-t-2xl md:rounded-t-none"
        />
      </div>

      {/* Right Content */}
      <div className="p-4 sm:p-6 md:w-1/2 flex flex-col justify-center space-y-3">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-snug text-gray-800">
          {post.title}
        </h2>

        {/* Author */}
        <p className="text-xs sm:text-sm text-gray-500">
          โดย{" "}
          <span
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={() => onAuthor(post.author)}
          >
            {post.author}
          </span>{" "}
          • {post.date} • {post.time} น.
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
          {post.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => onView(post.id)}
            className="btn btn-primary btn-sm"
          >
            อ่านเพิ่มเติม
          </button>

          {isLoggedIn && (
            <>
              <button
                onClick={() => onEdit(post.id)}
                className="btn btn-warning btn-sm"
              >
                แก้ไขโพสต์
              </button>

              <button
                onClick={() => onDelete(post.id)}
                className="btn btn-error btn-sm"
              >
                ลบโพสต์
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
