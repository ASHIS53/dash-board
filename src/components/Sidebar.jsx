import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", icon: HomeIcon, to: "/dashboard" },
  { name: "Placeholder", icon: ChartBarIcon, to: "/placeholder" },
  { name: "Users", icon: UsersIcon, to: "/users" },
  { name: "Settings", icon: Cog6ToothIcon, to: "/settings" },
  { name: "Help", icon: QuestionMarkCircleIcon, to: "/help" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b h-screen from-gray-800 to-gray-600 text-white  shadow-lg flex-shrink-0">
      <nav className="flex flex-col py-4 space-y-1">
        {navItems.map(({ name, icon: Icon, to }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 gap-4 hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <Icon className="h-6 w-6" />
            <span className="text-sm font-medium">{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
