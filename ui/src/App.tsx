import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import SqftCalculator from './pages/SQFTCalculator';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sqft-calculator" element={<SqftCalculator />} />
      </Routes>
    </Router>
  );
};

export default App;
