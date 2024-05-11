import { useOutlet } from 'react-router-dom';
import Nav from './components/Nav';
import { AuthInfoProvider } from './AuthContext';

/**
 * This is the layout component that will be used throughout the website
 *
 * @argument noPadding    specifies wether to include padding for the page,
 * defaults to including padding
 */
export const Layout = ({
  noPadding = false,
  hasAuthContext = true,
  children = null,
}: {
  noPadding?: boolean;
  hasAuthContext?: boolean;
  /* Using any is the easier way, I don't want to bother with things that go
   * above my head
   */
  children?: any;
}) => {
  const containerClasses = noPadding ? '' : 'px-10 py-12';
  if (!children) {
    children = useOutlet();
  }

  const out = (
    <main className="bg-grey-1 min-h-screen">
      <Nav />
      <div className={containerClasses}>{children}</div>
    </main>
  );

  return hasAuthContext ? <AuthInfoProvider>{out}</AuthInfoProvider> : out;
};
