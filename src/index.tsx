import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './fonts/roboto-regular.woff';
import './fonts/roboto-medium.woff';
// Установлен Redux
// Установлен Router Dom
//  https://dummyjson.com/products , https://api.storerestapi.com/products

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>

);

