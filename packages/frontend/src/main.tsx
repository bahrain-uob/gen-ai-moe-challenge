import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TestPage from './pages/TestPage.tsx';
import Writing from './pages/writing.tsx';
import Speaking from './pages/speaking.tsx';
import SignUp from './pages/SignUp.tsx';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    },
  },
  API: {
    REST: {
      myAPI: {
        endpoint: import.meta.env.VITE_API_URL,
        region: import.meta.env.VITE_APP_REGION,
      },
    },
  },
});

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
    path: '/sign-up',
    Component: SignUp,
  },
]);
// TODO: handle not found pages

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
