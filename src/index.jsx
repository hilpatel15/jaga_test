import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AppProvider } from "@/context/AppContext";
import "./index.css";

console.log("DEBUG: main.jsx mounting App");

const container = document.getElementById("root");
if (!container) {
  console.error("No #root element found in DOM");
} else {
  const root = createRoot(container);
  root.render(
      <AppProvider>
        <App />
      </AppProvider>
  );
    // Widget is loaded statically via index.html in production.