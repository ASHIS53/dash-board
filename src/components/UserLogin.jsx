import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const datas = {
      Usercode: username,
      Password: password,
      DeviceToken: "",
      DeviceMACId: "",
    };

    try {
      const response = await fetch("/api/api/Home/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          CompName: "glob",
          AuthPswd: "5AA37B2E90AF6EA983D2C68B330809BE",
        },
        body: JSON.stringify(datas),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      if (data.ResponsePacket && data.ResponsePacket.Token) {
        localStorage.setItem("authToken", data.ResponsePacket.Token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-600 px-4">
      <div className="bg-slate-100 shadow-xl rounded-2xl p-8 w-full max-w-md transition-all hover:scale-105  transform duration-300 shadow-md  border-t-4 border-gray-600">
        <h2 className="text-3xl font-extrabold text-center text-gray-700 mb-6">
          User Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 text-white bg-gray-600 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 active:scale-95"
          >
            Sign In
          </button>
        </form>

        {error && (
          <div className="mt-5 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm whitespace-normal break-words">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
