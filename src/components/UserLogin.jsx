import { useState } from "react";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async login
    setTimeout(() => {
      setLoading(false);
      console.log("Login Data:", formData);
      alert("Logged in!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <AtSymbolIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400 transition">
              <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
