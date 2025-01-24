import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrencyCalculator from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates'
import './index.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className='container'>
            <Link to="/" className="tab">Конвертер валют</Link>
            <Link to="/rates" className="tab">Курсы валют</Link>
          </div>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<CurrencyCalculator />} />
            <Route path="/rates" element={<ExchangeRates />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
