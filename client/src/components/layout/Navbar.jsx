import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

import Logo from "../common/Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully.");

    navigate("/");

  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (

            <div className="hidden items-center gap-3 lg:flex">

              <span className="text-sm font-bold text-gray-700">
                {user?.fullName[0]}
              </span>

              {user?.role === "admin" && (

                <Link
                  to="/admin"
                  className="rounded-lg bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
                >
                  Admin
                </Link>

              )}

              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg bg-red-600 px-2 py-1 text-white transition hover:bg-red-700 active:scale-95"
              >
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-lg bg-green-600 px-2 py-1 text-white transition hover:bg-green-700 active:scale-95 lg:flex"
            >
              <FaUserCircle />
              Login
            </Link>

          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-2xl text-gray-700 transition hover:bg-gray-100 lg:hidden"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

export default Navbar;