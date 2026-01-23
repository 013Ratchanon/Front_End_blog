import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../pages/Profile";

const MainLayout = ({ isLoggedIn, onLogout }) => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onOpenProfile={() => setOpenProfile(true)}
        />
      </div>

      {/* Main content */}
      <main className="">
        <Outlet />
      </main>

      <Footer />

      {/* ========== Profile Popup ========== */}
      {/* Background overlay */}
      {openProfile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          onClick={() => setOpenProfile(false)}
        ></div>
      )}

      {/* Side Popup */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-base-200 shadow-xl z-[70] p-4 transform transition-transform duration-200 ${
          openProfile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">โปรไฟล์</h2>

          <button
            className="btn btn-sm btn-circle"
            onClick={() => setOpenProfile(false)}
          >
            ✕
          </button>
        </div>

        <Profile />
      </div>
      {/* ================================== */}

    </div>
  );
};

export default MainLayout;
