import { Link, useLocation } from 'react-router-dom';
import '../css_files/navBar.css';

export default function NavBar() {
  const location = useLocation();

  return (
    <div>
      <nav className="nav">
        <ul>
          <li className={location.pathname === '/Home' ? 'active' : ''}>
            <Link to="/Home">Home</Link>
          </li>
          <li className={location.pathname === '/SectionExam' ? 'active' : ''}>
            <Link to="/SectionExamListening">Section Exams</Link>
          </li>

          <li className={location.pathname === '/PracticeExam' ? 'active' : ''}>
            <Link to="/PracticeExamListening">Practice</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
