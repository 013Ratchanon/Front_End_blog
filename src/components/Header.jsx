import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router";

const Header = () => {
  const { userInfo, logOut } = useContext(UserContext);
  const username = userInfo?.username;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-50 to-pink-50 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-indigo-700 hover:text-indigo-500 transition-colors"
        >
          SE NPRU Blog
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-3">
          {username ? (
            <>
              <Link
                to="/create"
                className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-all"
              >
                Create Post
              </Link>
              <button
                onClick={logOut}
                className="px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-all"
              >
                Logout ({username})
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-lg mx-4 my-2 p-4 space-y-2">
          {username ? (
            <>
              <Link
                to="/create"
                className="block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Create
              </Link>
              <button
                onClick={() => {
                  logOut();
                  setIsOpen(false);
                }}
                className="block px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-all w-full text-left"
              >
                Logout ({username})
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
