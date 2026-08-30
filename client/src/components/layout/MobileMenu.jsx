import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

import NavLinks from "./NavLinks";

function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {

    logout();

    toast.success("Logged out successfully.");

    onClose();

    navigate("/");

  };
  if (!isOpen) return null;

  return (
    <div className="border-t border-gray-200 bg-white shadow-lg lg:hidden">
      <div className="space-y-4 p-4">

        <NavLinks mobile onClick={onClose} />

        <div className="border-t pt-4">

          {isAuthenticated ? (

            <div className="space-y-3">

              <div className="px-2 text-sm font-semibold text-gray-700">
                {user?.fullName}
              </div>

              {user?.role === "admin" && (

                <Link
                  to="/admin"
                  onClick={onClose}
                  className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-white transition hover:bg-blue-700"
                >
                  Admin
                </Link>

              )}

              <button
                onClick={handleLogout}
                className="w-full rounded-lg bg-red-600 px-4 py-3 text-white transition hover:bg-red-700"
              >
                Logout
              </button>

            </div>

          ) : (

            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-white transition hover:bg-green-700"
            >
              <FaUserCircle />
              Login
            </Link>

          )}

        </div>

      </div>
    </div>
  );
}

export default MobileMenu;