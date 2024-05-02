import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';
import Writing from './pages/writing.tsx';
import ReadingQuestions from './ReadingQuestions.tsx';
import Speaking from './pages/speaking.tsx';
import FeedbackPage from './pages/FeedbackPage.tsx';

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
    path: '/:section/:sk', // Updated route with path parameters
    Component: ReadingQuestions,
  },
  {
    path: '/scores/:section/:sk', // Updated route with path parameters
    Component: FeedbackPage,
  },
  {    
    path: '/speaking',
    Component: Speaking,
  },
]);
// TODO: handle not found pages

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);