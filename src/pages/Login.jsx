import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Login Data:", formData);
      await new Promise((res) => setTimeout(res, 1000));
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Social login handlers (replace with real OAuth later)
  const handleGoogleLogin = () => alert("Google Sign-In clicked!");
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12 w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to your <span className="font-semibold text-indigo-600">Amaghara</span> account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Logins */}
      <div className="mt-6">
  <button
    onClick={handleGoogleLogin}
    className="w-full flex items-center justify-center border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-100 transition shadow-sm"
  >
    <FcGoogle className="w-6 h-6 mr-3" />
    <span className="text-gray-700 font-medium text-lg">Sign in with Google</span>
  </button>
</div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account? <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
