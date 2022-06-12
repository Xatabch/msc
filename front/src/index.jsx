import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.jsx';

import 'normalize.css';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);