import { useState, useMemo } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const RegisteredPatients = () => {
  const [form, setForm] = useState({
    type: "",
    flag: "",
    dateF: "",
    dateT: "",
  });

  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // flag to track fetch status

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    const { type, flag, dateF, dateT } = form;

    setLoading(true);
    setError("");
    setRowData([]);
    setDataFetched(false); // reset fetch flag

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get("/api/api/Admin/GetAddmitedPatientDetail", {
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
        setDataFetched(true); // show grid now
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

  return (
    <div
      className="min-h-screen px-6 py-8 bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-800
 text-white transition-all duration-300"
    >
      <h2 className="text-3xl font-bold mb-6 drop-shadow-md">
        Registered Patients
      </h2>

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
        className="bg-gradient-to-r from-black to-gray-800  rounded-2xl hover:from-gray-800 hover:to-black text-white font-semibold px-6 py-3 rounded shadow transition duration-300 cursor-pointer active:scale-95"
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {/* Error */}
      {error && <p className="text-red-300 mt-4 font-semibold">{error}</p>}

      {/* AG Grid - Show only after data is fetched */}
      {dataFetched && rowData.length > 0 && (
        <div
          className="ag-theme-alpine mt-8 rounded-lg shadow-lg bg-white"
          style={{ height: 500, width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 100]}
            animateRows={true}
          />
        </div>
      )}
    </div>
  );
};

export default RegisteredPatients;
