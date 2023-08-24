import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ClientProvider from './Context/ClientProvider';
// import AdminProvider from './Context/AdminProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* <AdminProvider> */}
    <ClientProvider>
      <App />
    </ClientProvider>
    {/* </AdminProvider> */}
  </BrowserRouter>
);
