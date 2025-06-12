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

{
  /* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients/registered" element={<RegisteredPatients />} />
          <Route path="/patients/addmitted" element={<AddmitedPatient />} />
          <Route path="/opd/list" element={<OpdListAndDuePayments />} />
          <Route path="/opd/discounts" element={<OpdDiscountsRefunds />} />
          <Route path="/opd/outstanding" element={<OpdOutstandingReports />} /> */
}

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },

  { label: "Registered Patients", path: "/patients/registered" },
  { label: "Addmited Patient", path: "//patients/addmitted" },
  { label: "Opd List And Due Payments", path: "/opd/list" },
  { label: "Opd Discounts And Refunds", path: "/opd/discounts" },
  { label: "Opd Outstanding Reports", path: "/opd/outstanding" },
];

function GlobalSearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = menuItems.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0].path);
    }
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search menu..."
        className=" bg-gray-200 w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-56 overflow-auto text-black">
          {suggestions.map((item) => (
            <li
              key={item.path}
              className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
              onClick={() => handleSelect(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
            className="hover:text-yellow-300 focus:outline-none focus:ring-0"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h3 className="text-xl tracking-wide">🏥 Dashboard</h3>
        </div>

        {/* Middle: Search */}
        <GlobalSearchInput />

        {/* Right: Icons + Theme Switcher + Logout */}
        <div className="flex items-center gap-4">
          <button className="cursor-pointer hover:text-yellow-300">
            <BellIcon className="h-6 w-6" />
          </button>
          <button className="cursor-pointer hover:text-yellow-300">
            <EnvelopeIcon className="h-6 w-6" />
          </button>

          <button
            onClick={toggleTheme}
            className="cursor-pointer hover:text-yellow-300"
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
            className="cursor-pointer hover:text-yellow-300"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
