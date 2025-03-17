import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import ErrorBoundary from "./ErrorBoundary";
import DocumentPage from "./components/editor/DocumentPage";

const App: React.FC = () => (
  <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>
    </Router>
  </ErrorBoundary>
);

export default App;
