import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Writing from './pages/writing.tsx';

// TODO: handle not found pages
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/writing',
    Component: Writing,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
