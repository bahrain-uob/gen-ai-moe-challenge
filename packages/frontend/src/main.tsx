import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';
import Writing from './pages/writing.tsx';
import Speaking from './pages/speaking.tsx';
import WritingP1 from './pages/writingP1.tsx';

// Place pages here
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/test',
    Component: TestPage,
  },
  {
    path: '/writing',
    Component: Writing,
  },
  {
    path: '/speaking',
    Component: Speaking,
  },
  {
    path: '/writingP1',
    Component: WritingP1,
  }
]);
// TODO: handle not found pages

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
