import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ showAuth = false, showLogout = false }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="backdrop-blur-sm border-b border-slate-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10" />
          <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 via-pink-500 to-violet-600 bg-clip-text text-transparent">
            Creative Showcase
          </span>
        </Link>

        {showAuth && (
          <div className="flex gap-3">
            <Link to="/login" className="px-5 py-2.5 rounded-lg border border-indigo-800 font-medium text-slate-700 shadow-lg 
                        shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 
                        hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200">
              Sign Up
            </Link>
          </div>
        )}

        {showLogout && (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
