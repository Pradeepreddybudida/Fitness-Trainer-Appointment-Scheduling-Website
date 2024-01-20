import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;
