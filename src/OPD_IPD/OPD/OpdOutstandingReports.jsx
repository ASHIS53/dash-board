import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const tabs = [
  { key: "category", label: "Category Outstanding" },
  { key: "department", label: "Department Outstanding" },
  { key: "doctor", label: "Doctor Outstanding" },
  { key: "referral", label: "Referral Outstanding" },
];

const SummaryBox = ({ title, value, className }) => (
  <div
    className={`p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 text-white ${className}`}
  >
    <h3 className="text-sm font-semibold mb-2 tracking-wide">{title}</h3>
    <p className="text-4xl font-extrabold">{value}</p>
  </div>
);

const OpdOutstandingDashboard = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [data, setData] = useState({
    category: null,
    department: null,
    doctor: null,
    referral: null,
  });
  const [loading, setLoading] = useState({
    category: false,
    department: false,
    doctor: false,
    referral: false,
  });
  const [error, setError] = useState({
    category: null,
    department: null,
    doctor: null,
    referral: null,
  });
  const [fade, setFade] = useState(true);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Name",
        field: "Name",
        flex: 2,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Amount (₹)",
        field: "Amount",
        flex: 1,
        sortable: true,
        filter: true,
        cellClass: "text-left font-semibold",
        valueFormatter: (params) =>
          params.value != null
            ? `₹${Number(params.value).toLocaleString()}`
            : "₹0",
      },
    ],
    []
  );

  const fetchData = async (tabKey) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError((prev) => ({
        ...prev,
        [tabKey]: "Authorization token missing. Please login again.",
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, [tabKey]: true }));
    setError((prev) => ({ ...prev, [tabKey]: null }));

    try {
      const res = await axios.get("/api/api/Admin/GetOPDOutstanding", {
        headers: {
          Authorization: `${token}`,
          CompName: "glob",
          AuthPswd: "5AA37B2E90AF6EA983D2C68B330809BE",
        },
      });

      const response = res.data;

      if (!response.ResponseStatus) {
        setError((prev) => ({
          ...prev,
          [tabKey]: response.ResponseMessage || "No records found.",
        }));
        setData((prev) => ({ ...prev, [tabKey]: [] }));
      } else {
        const mapping = {
          category: "CategoryOutstanding",
          department: "DepartmentOutstanding",
          doctor: "DoctorOutstanding",
          referral: "ReferalOutstanding",
        };

        setData((prev) => ({
          ...prev,
          [tabKey]: response.ResponsePacket[mapping[tabKey]] || [],
        }));
      }
    } catch (err) {
      console.error(err);
      setError((prev) => ({
        ...prev,
        [tabKey]: "Error fetching data. Please try again.",
      }));
      setData((prev) => ({ ...prev, [tabKey]: [] }));
    } finally {
      setLoading((prev) => ({ ...prev, [tabKey]: false }));
    }
  };

  const handleTabChange = (key) => {
    setFade(false);
    setTimeout(() => {
      setActiveTab(key);
      if (data[key] === null) fetchData(key);
      setFade(true);
    }, 250);
  };

  useEffect(() => {
    fetchData(activeTab); // initial fetch only once
  }, []);

  const summaryData = data[activeTab] || [];
  const totalAmount = summaryData.reduce(
    (acc, cur) => acc + (cur.Amount || 0),
    0
  );
  const totalItems = summaryData.length;
  const avgAmount =
    totalItems > 0 ? (totalAmount / totalItems).toFixed(2) : "0.00";

  return (
    <div className="max-w-6xl mx-auto max-l-screen mb-10 bg-slate-300 rounded-2xl shadow-xl pb-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        OPD Outstanding Dashboard
      </h1>

      <div className="flex justify-end pr-10 mb-2">
        <button
          onClick={() => fetchData(activeTab)}
          className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
        >
          Refresh
        </button>
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-l-screen mb-14 px-20">
        <SummaryBox
          title="Total Items"
          value={totalItems}
          className="bg-gradient-to-r from-teal-400 to-cyan-600 shadow-teal-400/50"
        />
        <SummaryBox
          title="Total Outstanding"
          value={`₹${totalAmount.toLocaleString()}`}
          className="bg-gradient-to-r from-rose-500 to-pink-600 shadow-rose-500/50"
        />
        <SummaryBox
          title="Average Outstanding"
          value={`₹${avgAmount}`}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 shadow-yellow-400/50"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 mb-10 flex space-x-8 justify-center">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`relative px-6 py-3 font-semibold text-lg rounded-full transition-colors duration-300 ${
              activeTab === key
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-100"
            }`}
            onClick={() => handleTabChange(key)}
          >
            {label}
            <span
              className={`absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full bg-indigo-600 transition-all duration-300 ${
                activeTab === key
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        className={`ag-theme-quartz transition-opacity duration-300 mb-10 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: "100%" }}
      >
        {loading[activeTab] ? (
          <div className="text-center py-16 text-gray-400 text-lg font-medium flex flex-col items-center gap-4">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
            <span>
              Loading {tabs.find((t) => t.key === activeTab)?.label}...
            </span>
          </div>
        ) : error[activeTab] ? (
          <div className="text-center py-14 text-red-600 font-semibold text-lg">
            {error[activeTab]}
          </div>
        ) : data[activeTab] && data[activeTab].length > 0 ? (
          <AgGridReact
            rowData={data[activeTab]}
            columnDefs={columnDefs}
            getRowId={({ data }) => data.Name}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            domLayout="autoHeight"
            animateRows={true}
            suppressRowHoverHighlight={false}
          />
        ) : (
          <div className="text-center py-14 text-gray-400 text-lg font-medium">
            No records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OpdOutstandingDashboard;
