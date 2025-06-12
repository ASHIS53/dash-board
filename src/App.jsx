import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserLogin from "./components/UserLogin";
import Dashboard from "./components/Dashboard";
import RegisteredPatients from "./components/RegisteredPatients";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import AddmitedPatient from "./Patient/AddmitedPatient";
import OpdListAndDuePayments from "./OPD_IPD/OPD/OpdListAndDuePayments";
import OpdDiscountsRefunds from "./OPD_IPD/OPD/OpdDiscountsRefunds";
import OpdOutstandingReports from "./OPD_IPD/OPD/OpdOutstandingReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<UserLogin />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients/registered" element={<RegisteredPatients />} />
          <Route path="/patients/addmitted" element={<AddmitedPatient />} />
          <Route path="/opd/list" element={<OpdListAndDuePayments />} />
          <Route path="/opd/discounts" element={<OpdDiscountsRefunds />} />
          <Route path="/opd/outstanding" element={<OpdOutstandingReports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
