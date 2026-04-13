import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import MeasuresPage from "./pages/MeasuresPage";
import PulsePage from "./pages/PulsePage";
import HousePage from "./pages/HousePage";
import LoginPage from "./pages/LoginPage";
import ActionPortfolioPage from "./pages/ActionPortfolioPage";

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
        <Route path="/fields" element={<ActionPortfolioPage />} />
        <Route path="/pulse" element={<PulsePage />} />
        <Route path="/action-portfolio" element={<Navigate to="/fields" replace />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
