"use client";

import { useState, useMemo } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";

// ✅ Import AG Grid styles
import "ag-grid-community/styles/ag-theme-quartz.css"; // ✅ Theme

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const OpdListAndDuePayments = () => {
  const [form, setForm] = useState({
    type: "",
    flag: "",
    dateF: "",
    dateT: "",
    viewType: "list", // 'list' or 'duePayments'
  });

  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    const { type, flag, dateF, dateT, viewType } = form;

    setLoading(true);
    setError("");
    setRowData([]);
    setDataFetched(false);

    try {
      const token = localStorage.getItem("authToken");
      const endpoint =
        viewType === "list"
          ? "/api/api/Admin/GetOPDList"
          : "/api/api/Admin/GetOPDDuePaymentsDetail";

      const res = await axios.get(endpoint, {
        params: { type, flag, dateF, dateT },
        headers: {
          Authorization: `${token}`,
          CompName: "glob",
          AuthPswd: "5AA37B2E90AF6EA983D2C68B330809BE",
        },
      });

      const data = res.data;
      if (!data.ResponseStatus) {
        setError(data.ResponseMessage || "No records found");
      } else {
        setRowData(data.ResponsePacket || []);
        setDataFetched(true);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please check credentials or network.");
    } finally {
      setLoading(false);
    }
  };

  const columnDefs = useMemo(() => {
    if (rowData.length === 0) return [];
    return Object.keys(rowData[0]).map((key) => ({
      field: key,
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }));
  }, [rowData]);

  const defaultColDef = {
    editable: false,
    filter: true,
    sortable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-sky-300 via-blue-500 to-indigo-700 text-white transition-all duration-300">
      <h2 className="text-3xl font-bold mb-6 drop-shadow-md">
        OPD {form.viewType === "list" ? "List" : "Due Payments"}
      </h2>

      {/* View Toggle */}
      <div className="flex mb-6 space-x-4">
        <button
          onClick={() => setForm({ ...form, viewType: "list" })}
          className={`px-4 py-2 rounded-md transition ${
            form.viewType === "list"
              ? "bg-blue-600 font-semibold"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          OPD List
        </button>
        <button
          onClick={() => setForm({ ...form, viewType: "duePayments" })}
          className={`px-4 py-2 rounded-md transition ${
            form.viewType === "duePayments"
              ? "bg-blue-600 font-semibold"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Due Payments
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="bg-white text-gray-900 px-4 py-2 rounded shadow transition duration-300"
        >
          <option value="">Select Type</option>
          <option value="D">D</option>
          <option value="IPD">IPD</option>
          <option value="Emergency">Emergency</option>
        </select>

        <select
          name="flag"
          value={form.flag}
          onChange={handleChange}
          className="bg-white text-gray-900 px-4 py-2 rounded shadow transition duration-300"
        >
          <option value="">Select Flag</option>
          <option value="d">D</option>
          <option value="active">Active</option>
          <option value="discharged">Discharged</option>
        </select>

        <input
          type="date"
          name="dateF"
          value={form.dateF}
          onChange={handleChange}
          className="bg-white text-gray-900 px-4 py-2 rounded shadow transition duration-300"
        />

        <input
          type="date"
          name="dateT"
          value={form.dateT}
          onChange={handleChange}
          className="bg-white text-gray-900 px-4 py-2 rounded shadow transition duration-300"
        />
      </div>

      {/* Fetch Button */}
      <button
        onClick={fetchData}
        className="bg-gradient-to-r from-black to-gray-800 rounded-2xl hover:from-gray-800 hover:to-black text-white font-semibold px-6 py-3 rounded shadow transition duration-300 cursor-pointer active:scale-95"
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {/* Error */}
      {error && <p className="text-red-300 mt-4 font-semibold">{error}</p>}

      {/* AG Grid */}
      {dataFetched && rowData.length > 0 && (
        <div
          className="ag-theme-quartz mt-8 rounded-lg shadow-lg"
          style={{ height: 500, width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            animateRows={true}
          />
        </div>
      )}

      {/* Optional: Custom resize handle styling (only if still needed) */}
    </div>
  );
};

export default OpdListAndDuePayments;
