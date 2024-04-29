import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState('');

  function onClick() {
    console.log(import.meta.env.VITE_API_URL);
    fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(setCount);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onClick}>count is {count ? count : 'unknown'}</button>
        <p>
          <Link to="/test"> Test page </Link>
          <br />
          <br />
          <Link to="/writing"> Writing </Link>
          <br />
          <br />
          <Link to="/reading/1"> Reading </Link>
          <br />
          <br />
          <Link to="/speaking"> Speaking </Link>
        </p>
        <p> Sayed Ahmed was here </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>sara</p>
    </>
  );
}

export default App;
 
// // import Home from './pages/Home';
// import SectionExam from './pages/sectionExam';
// import Profile from './pages/Profile';
// import SectionExamListening from './pages/sectionExamListening';
// import SectionExamReading from './pages/sectionExamReading';
// import ReadingExam from './pages/ReadingExam';
// import { Route, Routes } from 'react-router-dom';
// import ListeningExam from './pages/ListeningExam';
 
// import FeedbackPage from './pages/FeedbackPage';
// import PracticeExamReading from './pages/practiceExamReading.tsx';
// import PracticeExam from './pages/practiceExam';
// import PracticeExamListening from './pages/practiceExamListening.tsx';
// import ReadingExerciseContainer from './components/ReadingExerciseContainer (1).tsx';
// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/Home" element={<Home />} />
//         <Route path="/sectionExam" element={<SectionExam />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route
//           path="/SectionExamListening"
//           element={<SectionExamListening />}
//         />
//         <Route path="/ReadingExam" element={<ReadingExam />} />
//         <Route path="/SectionExamReading" element={<SectionExamReading />} />
//         <Route path="/ListeningExam" element={<ListeningExam />} />
 
//         <Route path="/FeedbackPage" element={<FeedbackPage />} />
//         <Route path="/PracticeExamReading" element={<PracticeExamReading />} />
//         <Route
//           path="/PracticeExamListening"
//           element={<PracticeExamListening />}
//         />
//         <Route path="/PracticeExam" element={<PracticeExam />} />
//         <Route
//   path="/ReadingExerciseContainer"
//   element={<ReadingExerciseContainer />} />
 
 
//       </Routes>
//     </div>
//   );
// }
 
// export default App;