// import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   LayoutDashboard,
//   UserIcon,
//   Settings,
//   BarChart,
//   Folder,
//   Menu,
//   X,
// } from "lucide-react";

// const SidebarLink = ({ icon: Icon, label, path }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       onClick={() => navigate(path)}
//       className="flex items-center gap-3 cursor-pointer text-white hover:bg-gray-700 p-2 rounded-md transition"
//     >
//       <Icon className="w-5 h-5" />
//       <span className="text-sm">{label}</span>
//     </div>
//   );
// };

// export default function Layout() {
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`bg-gray-800 text-white ${
//           collapsed ? "w-0" : "w-60"
//         } transition-all duration-300 flex flex-col p-3`}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-bold">{!collapsed && "My App"}</h2>
//           <button onClick={() => setCollapsed(!collapsed)}>
//             {collapsed ? <Menu /> : <X />}
//           </button>
//         </div>

//         <nav className="space-y-2">
//           <SidebarLink icon={HomeIcon} label="Home" path="/dashboard" />
//           <SidebarLink
//             icon={LayoutDashboard}
//             label="Analytics"
//             path="/analytics"
//           />
//           <SidebarLink icon={UserIcon} label="Users" path="/users" />
//           <SidebarLink icon={BarChart} label="Reports" path="/reports" />
//           <SidebarLink icon={Folder} label="Documents" path="/documents" />
//           <SidebarLink icon={Settings} label="Settings" path="/settings" />
//         </nav>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  if (isLoginPage) return <Outlet />;

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Sidebar */}
      {isSidebarVisible && (
        <aside className="w-64 flex-shrink-0 bg-gray-800 text-white">
          <Sidebar />
        </aside>
      )}

      {/* Main layout */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-gray-100 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
