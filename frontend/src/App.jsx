import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './Components/Cadastro/Cadastro';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Cadastro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;