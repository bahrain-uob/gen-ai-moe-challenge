import { useContext } from 'react';
import { Nav } from './components/Nav';
import { useOutlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const Layout = ({
  noPadding = false,
  children = null,
  isLanding = false,
}: {
  noPadding?: boolean;
  children?: any;
  isLanding?: boolean;
}) => {
  const authInfo = useContext(AuthContext);
  const showSignIn = authInfo.user === undefined;

  // TOOD: move this logic inside `AuthContext`
  // useEffect(() => {
  //   if (user === undefined && isLanding) {
  //     const timeoutId = setTimeout(() => {
  //       setShowSignIn(true);
  //     }, 1000);

  //     return () => clearTimeout(timeoutId); // Cleanup timeout
  //   }
  // }, [user, isLanding]);

  const getNavEntries = () => {
    if (isLanding) {
      return [
        { text: 'About', to: '""' },
        { text: 'How to use', to: '"' },
        ...(showSignIn ? [{ text: 'Sign in', to: '/sign-in' }] : []),
      ];
    } else if (authInfo.user) {
      return [
        { text: 'Full Exams', to: '/Full-Exam' },
        { text: 'Section Exams', to: '/Sections' },
        { text: 'Exercises', to: '/Exercises' },
      ];
    } else {
      return [
        { text: 'About', to: '"' },
        { text: 'How to use', to: '""' },
        { text: 'Sign in', to: '/sign-in' },
      ];
    }
  };

  const navEntries = getNavEntries();

  const containerClasses = noPadding ? '' : 'px-6 py-8 sm:px-10 sm:py-12';

  if (!children) {
    children = useOutlet();
  }

  return (
    <main className="bg-grey-1 min-h-screen">
      <Nav entries={navEntries} />
      <div className={containerClasses}>{children}</div>
    </main>
  );
};
