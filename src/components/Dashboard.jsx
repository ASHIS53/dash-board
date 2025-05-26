import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("/api/api/Admin/GetDashboard", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            CompName: "glob",
            AuthPswd: "5AA37B2E90AF6EA983D2C68B330809BE",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data.ResponsePacket);
      } catch (err) {
        setError(err.message);
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-indigo-600 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  const Card = ({ title, value, bgColor }) => (
    <div
      className={`rounded-xl shadow-md text-white p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl ${bgColor}`}
    >
      <h3 className="text-sm font-medium opacity-90">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-100 to-gray-200 ">
      {/* Header */}

      {/* Main Content */}
      <main className="mx-auto px-4 py-8">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card
            title="Registrations"
            value={dashboardData?.Registration?.Count || 0}
            bgColor="bg-gradient-to-tr from-cyan-500 to-blue-500"
          />
          <Card
            title="Total Admissions"
            value={dashboardData?.Addmission?.Count || 0}
            bgColor="bg-gradient-to-tr from-indigo-500 to-purple-500"
          />
          <Card
            title="Current Admissions"
            value={dashboardData?.CurrentAddmission?.Count || 0}
            bgColor="bg-gradient-to-tr from-teal-500 to-green-500"
          />
          <Card
            title="OPD Visits"
            value={dashboardData?.OPD?.Count || 0}
            bgColor="bg-gradient-to-tr from-pink-500 to-rose-500"
          />
          <Card
            title="Total Revenue"
            value={`₹${(dashboardData?.Revenue?.Amount || 0).toLocaleString()}`}
            bgColor="bg-gradient-to-tr from-emerald-500 to-lime-500"
          />
          <Card
            title="Total Collection"
            value={`₹${(
              dashboardData?.Colletion?.Amount || 0
            ).toLocaleString()}`}
            bgColor="bg-gradient-to-tr from-yellow-500 to-amber-500"
          />
          {dashboardData?.Discharge && (
            <Card
              title="Discharges"
              value={dashboardData.Discharge.Count}
              bgColor="bg-gradient-to-tr from-rose-400 to-pink-600"
            />
          )}
        </div>

        {/* Additional Sections */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Today's Status */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">
              Today's Status
            </h2>
            <ul className="space-y-4 text-gray-800">
              <li className="flex justify-between items-center">
                <span>Employees Present</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {dashboardData?.TodayPresent?.Count || 0}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Employees On Leave</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  {dashboardData?.TodayLeave?.Count || 0}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Collections</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  ₹
                  {dashboardData?.Colletion?.Amount
                    ? dashboardData.Colletion.Amount.toLocaleString()
                    : "0"}
                </span>
              </li>
            </ul>
          </div>

          {/* Employee Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-600 mb-4">
              Employee Statistics
            </h2>
            <ul className="space-y-4 text-gray-800">
              <li className="flex justify-between items-center">
                <span>Total Employees</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  {dashboardData?.TotalEmploye?.Count || 0}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
