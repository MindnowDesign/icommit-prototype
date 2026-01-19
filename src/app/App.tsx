import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import MeasuresPage from "./pages/MeasuresPage";
import FieldsOfActionPage from "./pages/FieldsOfActionPage";
import PulsePage from "./pages/PulsePage";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          className: "font-sans",
          style: {
            borderRadius: "12px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/measures" element={<MeasuresPage />} />
        <Route path="/fields" element={<FieldsOfActionPage />} />
        <Route path="/pulse" element={<PulsePage />} />
      </Routes>
    </BrowserRouter>
  );
}
