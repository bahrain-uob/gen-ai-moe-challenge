import { Link } from 'react-router-dom';
import '../css_files/Exam.css';

interface ExamDetails {
  title: string;
  duration: string;
  parts: number;
  questions: number;
  link: string;
}

function SectionExamModal({
  onClose,
  examDetails,
}: {
  onClose: () => void;
  examDetails: ExamDetails;
}) {
  return (
    <div className="modal-overlay">
      <div className="SectionExamModalContainer">
        <div className="SectionExamModalHeader">
          <span className="close-btn" onClick={onClose}>
            ×
          </span>
        </div>
        <div className="SectionExamModalTitle">
          <h1>{examDetails.title}</h1>
        </div>
        <div className="SectionExamModalDetails">
          <h3>{examDetails.duration}</h3>
          <h3>{examDetails.parts} Parts</h3>
          <h3>{examDetails.questions} Questions</h3>
        </div>
        <Link to={examDetails.link}>
          <button className="start-test-button">Start Exam</button>
        </Link>
      </div>
    </div>
  );
}

export default SectionExamModal;
