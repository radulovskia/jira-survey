import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global CSS file (optional)
import App from './App'; // Import your main React component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode is a React feature for highlighting potential issues in development.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
