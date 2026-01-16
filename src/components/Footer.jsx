import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-inner py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-700">
        {/* ข้อความลิขสิทธิ์ */}
        <p className="text-sm mb-3 md:mb-0">
          © 2026 SE NPRU Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
