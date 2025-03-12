import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./core/components/Navbar";
import SHEQAuditView from "./pages/SHEQAudit/containers/SHEQAuditView.tsx"; // Import the SHEQAuditView component
import TestModelCallView from "./pages/TestModelCall/TestModelCallView"
import SHEQAuditReportingView from "./pages/SHEQAudit/containers/SHEQAuditReportingView.tsx"

const Main = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="pt-20 h-screen overflow-hidden"> {/* Add padding to the top and set height to full */}
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<TestModelCallView/>} />
            <Route path="/sheqauditreports" element={<SHEQAuditReportingView/>}/>
            <Route path="/sheqaudit" element={<SHEQAuditView />} /> {/* Add the route for SHEQAuditView */}
          </Route>
        </Routes>
      </div>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </StrictMode>
    </QueryClientProvider>
  </PrimeReactProvider>
);