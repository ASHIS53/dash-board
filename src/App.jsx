import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserLogin from "./components/UserLogin";
import Dashboard from "./components/Dashboard";
import Placeholder from "./components/Placeholder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<UserLogin />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/placeholder" element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
