import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

// Pages
import Main from './pages/Main/Main.jsx';
import Upload from './pages/Upload/Upload.jsx';
import Radio from './pages/Radio/Radio.jsx';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Radio />}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="upload" element={<Upload/>}/>
        </Routes>
    </BrowserRouter>
  );
}