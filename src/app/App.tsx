import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ResultsPage } from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Results page route commented out - page code preserved */}
        {/* <Route path="/results" element={<ResultsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
