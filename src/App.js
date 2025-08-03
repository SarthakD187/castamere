import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CastamereHomepage from "./CastamereHomepage";
import ProjectsPage from "./Projects/ProjectsPage";
import Summarizer from "./Projects/Summarizer";  // Import Summarizer component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CastamereHomepage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/summarizer" element={<Summarizer />} /> {/* Add Summarizer route */}
      </Routes>
    </Router>
  );
}
