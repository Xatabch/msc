import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Pages
import Main from './pages/Main/Main.jsx';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
        </Routes>
    </Router>
  );
}