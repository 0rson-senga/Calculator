// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import App from './example.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This wrapper enables routing for the entire application */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);