import '../css_files/Exam.css';
import NavBar from '../components/navBar';
import { useLocation } from 'react-router-dom';
export default function FeedbackPage() {
  const location = useLocation();
  const scoreParam = new URLSearchParams(location.search).get('score');
  const score = scoreParam ? scoreParam : 'N/A';
  return (
    <div>
      <NavBar />
      <div className="feedback-div">
        <div className="feedback-content">
          <h1>Reading Exam</h1>
          <div className="score-info">
            <h2> Your Score: </h2>
            <h3>{score}</h3>
          </div>

          <div className="time-info">
            <h2> Time spent: </h2>
            <h3>55:09 minutes</h3>
          </div>

          <table>
            <tr>
              <th>Your Answer</th>
              <th>Key Answer</th>
            </tr>
            <tr>
              <td>something</td>
              <td>not something</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
