import  { useState } from 'react';
import '../css_files/Exam.css';
import FContainer from './FContainer'; // Import the modified FContainer component

export default function ExamPracticeBox({ title }: { title: string }) {
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
        <div className="modal-overlay">
          <div className="practice-modal-content">
            <FContainer onClose={closeModal} /> {/* Pass onClose function to FContainer */}
          </div>
        </div>
      )}
    </div>
  );
}
