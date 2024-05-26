import { useOutlet } from 'react-router-dom';
import { Nav } from './components/Nav';

/**
 * This is the layout component that will be used throughout the website
 *
 * @argument noPadding    specifies wether to include padding for the page,
 * defaults to including padding
 */
export const Layout = ({
  noPadding = false,
  children = null,
  isLanding = false,
}: {
  noPadding?: boolean;
  /* Using any is the easier way, I don't want to bother with things that go
   * above my head
   */
  children?: any;
  isLanding?: boolean;
 
}) => {
  const containerClasses = noPadding ? '' : 'px-10 py-12';
  if (!children) {
    children = useOutlet();
  }
  const navEntries = isLanding
    ? [ 
      { text: 'Features', to: '""' },
        { text: 'How to use', to: '""' },
        { text: 'About', to: '""' },
        { text: 'SIGN IN', to: '/sign-in' },
      ]
    : [
        { text: 'Full Exams', to: '/Full-Exam' },
        { text: 'Section Exams', to: '/Sections' },
        { text: 'Exercises', to: '/Exercises' },
      ];

      

  const out = (
    <main className="bg-grey-1 min-h-screen">
      <Nav entries={navEntries} isLanding={isLanding}/>
      <div className={containerClasses}>{children}</div>
    </main>
  );

  return out;
};
