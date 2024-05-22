import { AuthUser, fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { useNavigate, useOutlet } from 'react-router-dom';

export const Layout = ({
  noPadding = false,
  children = null,
  isLanding = false,
}: {
  noPadding?: boolean;
  children?: any;
  isLanding?: boolean;
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      await fetchAuthSession({ forceRefresh: true });
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error: any) {
      console.error('Error fetching current user:', error);
    }
  };

  const navEntries = isLanding
    ? [
        { text: 'About', to: '""' },
        { text: 'How to use', to: '""' },
      ]
    : [
        { text: 'Full Exams', to: '/Full-Exam' },
        { text: 'Section Exams', to: '/Sections' },
        { text: 'Exercises', to: '/Exercises' },
      ];

  if (user == undefined) {
    // If user is on the landing page and not authenticated, include "Sign In"
    navEntries.push({ text: 'Sign in', to: '/sign-in' });
  }

  const containerClasses = noPadding ? '' : 'px-10 py-12';

  if (!children) {
    children = useOutlet();
  }
  useNavigate(0);
  return (
    <main className="bg-grey-1 min-h-screen">
      <Nav entries={navEntries} />
      <div className={containerClasses}>{children}</div>
    </main>
  );
};
