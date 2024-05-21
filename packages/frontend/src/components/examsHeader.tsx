// import { useState } from 'react'; // Import useState hook
// import { useNavigate } from 'react-router-dom';
// import CountdownTimer from './CountdownTimer'; // Assuming CountdownTimer is the name of your countdown timer component
// import '../stylesheets/exam.css';

// interface ExamsHeaderProps {
//   duration: number; // Duration of the exam in minutes
// }

// export default function ExamsHeader({ duration }: ExamsHeaderProps) {
//   const [showModal, setShowModal] = useState(false);
//   const [timeUp, setTimeUp] = useState(false); // State to track if time is up
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     if (timeUp) {
//       setShowModal(true); // Show modal if time is up
//     } else {
//       setShowModal(true); // Show modal if submit button is clicked before time is up
//     }
//   };

//   const handleConfirm = () => {
//     setShowModal(false);
//     navigate('/FeedbackPage');
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//   };

//   const handleTimeUp = () => {
//     setTimeUp(true); // Set timeUp to true when time is up
//     setShowModal(true); // Show modal when time is up
//   };

//   return (
//     <div className="exam-header">
//       <div className="remaining-time">
//         <CountdownTimer minutes={duration} onTimeUp={handleTimeUp} />
//       </div>
//       <div className="header-button-container">
//         <button onClick={handleButtonClick} className="submit-test-button">
//           Submit
//         </button>
//       </div>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <span className="close-btn" onClick={handleCancel}>
//                 ×
//               </span>
//             </div>
//             <div className="modal-main">
//               {timeUp ? (
//                 <p>Time is up!</p>
//               ) : (
//                 <p>Are you sure you want to submit?</p>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button onClick={handleCancel} className="cancel-test-button">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirm}
//                 className="modal-submit-test-button"
//               >
//                 Submit and review answers
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
