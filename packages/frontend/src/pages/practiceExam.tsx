import '../css_files/general.css';
import '../css_files/FCSS2.css';
import NavBar from '../components/navBar';

import { NavLink } from 'react-router-dom';

export default function practiceExam() {
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: '70px' }}>
        <h1 style={{ fontFamily: 'Roboto, sans-serif' }}>Practice Exams</h1>
      </div>
      <div className="ExamType">
        <NavLink to="/PracticeExamListening" className="ExamTypeButton">
          Listening
        </NavLink>

        <NavLink to="/practiceExamReading" className="ExamTypeButton">
          Reading
        </NavLink>
      </div>
    </div>
  );
}
