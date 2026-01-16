import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg">
        <Header />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-inner mt-8">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
