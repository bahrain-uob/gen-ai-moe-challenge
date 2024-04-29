import  { useState } from 'react';
import '../css_files/Exam.css';
import SectionExamModal from './SectionExamModal';

interface ExamDetails {
  title: string;
  duration: string;
  parts: number;
  questions: number;
  link: string;
}

export default function ExamBox({
  title,
  examDetails,
}: {
  title: string;
  examDetails: ExamDetails;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="examBox" style={{ backgroundColor: 'white' }}>
      <div className="BoxContent">
        <h3>{title}</h3>
      </div>
      <button className="button" onClick={openModal}>
        Start Exam
      </button>
      {isModalOpen && (
        <SectionExamModal onClose={closeModal} examDetails={examDetails} />
      )}
    </div>
  );
}
