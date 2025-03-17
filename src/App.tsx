import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';

const App: React.FC = () => (
  <Router>
    <Routes>
      {/* Home page as the landing page */}
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;