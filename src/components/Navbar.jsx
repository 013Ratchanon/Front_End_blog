import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout, onOpenProfile }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-2xl font-bold cursor-pointer"
        >
          SE-Blog
        </a>
      </div>

      <div className="flex-none gap-3">
        {!isLoggedIn ? (
          <>
            <button className="btn btn-outline btn-sm" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <>
            {/* Avatar Button */}
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={onOpenProfile}
            >
              <div className="w-10 rounded-full">
                <img src="https://i.pravatar.cc/300" />
              </div>
            </button>

            <button className="btn btn-error btn-sm" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
