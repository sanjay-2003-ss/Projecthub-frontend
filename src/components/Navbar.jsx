import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  FaHome, FaPlus, FaHeart, FaBookmark, FaChartBar, FaBars, FaTimes, FaUser,
} from "react-icons/fa";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/create", icon: FaPlus, label: "Create", authOnly: true },
    { to: "/my-projects", icon: FaBookmark, label: "My Projects", authOnly: true },
    { to: "/favorites", icon: FaHeart, label: "Favorites", authOnly: true },
    { to: "/analytics", icon: FaChartBar, label: "Stats", authOnly: true },
  ];

  const NavItem = ({ to, icon: Icon, label, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-100 
        hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white 
        rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm">

      <Icon className="text-lg" />
      <span>{label}</span>
    </Link>
  );

  const renderLinks = (onClick) =>
    navItems
      .filter((item) => !item.authOnly || user)
      .map((item) => <NavItem key={item.to} {...item} onClick={onClick} />);

  return (
    <nav className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline group-hover:tracking-wide transition-all duration-300">
            ProjectHub
          </span>
        </Link>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {renderLinks()}

          {user ? (
            <div
              className="relative ml-4 pl-4 border-l border-gray-300 dark:border-gray-700"
              onMouseEnter={() => {
                clearTimeout(window.profileMenuTimeout);
                setShowProfileMenu(true);
              }}
              onMouseLeave={() => {
                window.profileMenuTimeout = setTimeout(() => setShowProfileMenu(false), 250);
              }}
            >
              <button className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow">
                  {user.email?.[0].toUpperCase()}
                </div>
              </button>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg 
                             border border-gray-200 dark:border-gray-700 backdrop-blur-md overflow-hidden 
                             transition-all duration-300 ease-in-out transform origin-top-right 
                             animate-dropdown-fade" >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700/40 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-200"
        >
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col gap-2 py-4 px-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          {renderLinks(() => setIsMenuOpen(false))}

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <FaUser className="text-lg" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700/40 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
