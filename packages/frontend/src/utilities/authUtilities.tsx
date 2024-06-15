import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// Adapted from https://github.com/remix-run/react-router/blob/4e85e9884c2c0c7125edc91941b3e023a9d3180c/examples/auth/src/App.tsx
export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useContext(AuthContext);
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}
