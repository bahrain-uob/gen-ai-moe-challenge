import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import React from 'react';
import { routes } from './routes';
import { AuthInfoProvider } from './AuthContext';

Amplify.configure(
  {
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
  },
  {
    API: {
      REST: {
        // Include authentication token in headers
        headers: async () => {
          const authToken = (
            await fetchAuthSession()
          ).tokens?.idToken?.toString();
          return { Authorization: authToken ? authToken : '' };
        },
      },
    },
  },
);

const root = (
  <React.StrictMode>
    <AuthInfoProvider>
      <RouterProvider router={routes} />
    </AuthInfoProvider>
  </React.StrictMode>
);
ReactDOM.createRoot(document.getElementById('root')!).render(root);
