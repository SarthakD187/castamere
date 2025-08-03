import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CastamereHomepage from "./CastamereHomepage";
import ProjectsPage from "./Projects/ProjectsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CastamereHomepage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}
