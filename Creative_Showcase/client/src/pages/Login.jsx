import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, saveAuth } from "../services/authservices.js";
import MainLayout from "../layout/MainLayout";
import Navbar from "../components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;

    try {
      setLoading(true);
      const data = await loginUser(form);
      saveAuth(data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Navbar />

      {/* Page background */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center
                      bg-linear-to-br from-slate-100 via-blue-200 to-indigo-300 px-4">

        {/* Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 to-violet-600
                           bg-clip-text text-transparent">
              Login
            </h1>
            <p className="text-slate-500 mt-2">
              continue sharing your creativity
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none
                          transition"/>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500
               focus:outline-none transition" />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600
                shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all
                disabled:opacity-60">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm mt-6 text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
