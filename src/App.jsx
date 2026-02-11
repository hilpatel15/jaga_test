// import React from "react";
// import { useAppContext } from "@/context/AppContext";
// import LandingPage from "@/pages/LandingPage";
// import Dashboard from "@/pages/Dashboard";
// import ClientDetailForm from "@/components/forms/ClientDetailForm";

// console.log("DEBUG: App.jsx loaded", window.location.href);

// const App = () => {
//   const { currentPage } = useAppContext();

//   // force Dashboard display when URL param present
//   const forced = new URL(window.location.href).searchParams.get("view");
//   if (forced === "dashboard") return <Dashboard />;

//   return (
//     <>
//       {currentPage === "landing" && <LandingPage />}
//       {currentPage === "dashboard" && <Dashboard />}
//       {currentPage === "client-form" && <ClientDetailForm />}
//     </>
//   );
// };

// export default App;

import React from "react";
import { useAppContext } from "@/context/AppContext";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");

  if (view === "dashboard") return <Dashboard />;

  return <LandingPage />;
}
