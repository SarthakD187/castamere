import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CastamereHomepage from "./CastamereHomepage";
import ProjectsPage from "./Projects/ProjectsPage";
import Summarizer from "./Projects/Summarizer";
import StockMarketDashboard from "./Projects/StockMarketDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CastamereHomepage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/summarizer" element={<Summarizer />} /> 
        <Route path="/stock-market-dashboard" element={<StockMarketDashboard />} />
      </Routes>
    </Router>
  );
}
