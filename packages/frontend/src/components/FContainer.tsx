import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import '../css_files/Exam.css';

interface Props {
  onClose: () => void; // Callback function to close the modal
}

function Container({ onClose }: Props) {
  const [part1Checked, setPart1Checked] = useState(false);
  const [part2Checked, setPart2Checked] = useState(false);
  const [part3Checked, setPart3Checked] = useState(false);
  const [timeLimit, setTimeLimit] = useState(10);
  const [simulateExam, setSimulateExam] = useState(false);

  useEffect(() => {
    console.log('Part 1 checked:', part1Checked);
  }, [part1Checked]);

  useEffect(() => {
    console.log('Part 2 checked:', part2Checked);
  }, [part2Checked]);

  useEffect(() => {
    console.log('Part 3 checked:', part3Checked);
  }, [part3Checked]);

  return (
    <div className="PracticeModalContainer">
      <div style={{ textAlign: 'end' }}>
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
      </div>
      <div className="choose-tasks">
        <h1>Choose Tasks To Practice:</h1>
        <div>
          <input
            type="checkbox"
            checked={part1Checked}
            onChange={() => setPart1Checked(!part1Checked)}
          />
          <label className="parts">Part 1 (14 questions)</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={part2Checked}
            onChange={() => setPart2Checked(!part2Checked)}
          />
          <label className="parts">Part 2 (13 questions)</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={part3Checked}
            onChange={() => setPart3Checked(!part3Checked)}
          />
          <label className="parts">Part 3 (13 questions)</label>
        </div>
      </div>
      <div className="choose-time">
        <h1>Choose a time limit:</h1>
        <select
          className="select-time"
          value={timeLimit}
          onChange={e => setTimeLimit(parseInt(e.target.value, 10))}
        >
          {[10, 20, 30, 40, 50, 60].map(time => (
            <option key={time} value={time}>
              {time} minutes <FaChevronDown />
            </option>
          ))}
        </select>
        <div className="simulate-exam">
          <input
            type="checkbox"
            checked={simulateExam}
            onChange={() => setSimulateExam(!simulateExam)}
          />
          <label>Simulate real exam (all parts, 60 minutes)</label>
        </div>
      </div>
      <Link to="/ReadingExerciseContainer">
        <button className="start-test-button">Start Exam</button>
      </Link>
    </div>
  );
}

export default Container;
