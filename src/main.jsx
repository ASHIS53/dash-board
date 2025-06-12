import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Debug from "./components/debug.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Debug />
  </>
);
