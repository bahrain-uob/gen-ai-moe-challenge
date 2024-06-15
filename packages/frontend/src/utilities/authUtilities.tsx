import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// Adapted from https://github.com/remix-run/react-router/blob/4e85e9884c2c0c7125edc91941b3e023a9d3180c/examples/auth/src/App.tsx
export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useContext(AuthContext);
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * Send user back to the page they came from.
 *
 * Send user back to the page they tried to visit when they were redirected to
 * the login page. Use { replace: true } so we don't create another entry in the
 * history stack for the login page.  This means that when they get to the
 * protected page and click the back button, they won't end up back on the login
 * page, which is also really nice for the user experience.
 *
 * Adapted from https://github.com/remix-run/react-router/blob/4e85e9884c2c0c7125edc91941b3e023a9d3180c/examples/auth/src/App.tsx
 */
export function useRedirectBack() {
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/home';
  return {
    redirectBack: () => {
      navigate(from, { replace: true });
    },
  };
}
