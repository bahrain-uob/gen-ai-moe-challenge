import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { AuthInfoProvider } from './AuthContext';

/**
 * This is the layout component that will be used throughout the website
 *
 * @argument noPadding    specifies wether to include padding for the page,
 * defaults to including padding
 */
export const Layout = ({ noPadding = false, hasAuthContext = true }) => {
  const containerClasses = noPadding ? '' : 'px-10 py-12';

  const out = (
    <main className="bg-grey-1 min-h-screen">
      <Nav />
      <div className={containerClasses}>
        <Outlet />
      </div>
    </main>
  );

  return hasAuthContext ? <AuthInfoProvider>{out}</AuthInfoProvider> : out;
};
