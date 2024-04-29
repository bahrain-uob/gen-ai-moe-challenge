import { NavLink } from 'react-router-dom';

import '../css_files/general.css';
import NavBar from '../components/navBar';

export default function SectionExam() {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '70px' }}>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Section Exams</h1>
      </div>
      <div>
        <NavLink to="/sectionExamListening" className="ExamTypeButton">
          Listening
        </NavLink>
        <NavLink to="/sectionExamReading" className="ExamTypeButton">
          Reading
        </NavLink>
      </div>

      <h2>Continue</h2>
    </div>
  );
}
