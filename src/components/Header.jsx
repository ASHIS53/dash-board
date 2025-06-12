import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  Bars3Icon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function AppHeader({ toggleSidebar }) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (mode) => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <header
      className="bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800
 text-white transition-all duration-300 shadow sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Sidebar Toggle & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className=" hover:text-yellow-300 focus:outline-none focus:ring-0"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h3 className="text-xl  tracking-wide">🏥 Dashboard</h3>
        </div>

        {/* Right: Icons + Theme Switcher + Logout */}
        <div className="flex items-center gap-4">
          <button className=" cursor-pointer hover:text-yellow-300 ">
            <BellIcon className="h-6 w-6" />
          </button>
          <button className=" cursor-pointer hover:text-yellow-300 ">
            <EnvelopeIcon className="h-6 w-6" />
          </button>

          <button
            onClick={toggleTheme}
            className=" cursor-pointer hover:text-yellow-300 "
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          <button
            onClick={() => navigate("/login")}
            className=" cursor-pointer hover:text-yellow-300 "
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
