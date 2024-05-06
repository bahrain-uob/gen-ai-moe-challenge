import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

/**
 * This is the layout component that will be used throughout the website
 *
 * @argument noPadding    specifies wether to include padding for the page,
 * defaults to including padding
 */
export const Layout = ({ noPadding = false }) => {
  const containerClasses = noPadding ? '' : 'px-10 py-12';

  return (
    <main className="bg-grey-1 min-h-screen">
      <Nav />
      <div className={containerClasses}>
        <Outlet />
      </div>
    </main>
  );
};
