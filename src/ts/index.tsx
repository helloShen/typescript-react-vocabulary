/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/index.css';
import App from './App';

const root = ReactDOM.createRoot(
    document.querySelector('.root') as Element,
);
root.render(<App />);
