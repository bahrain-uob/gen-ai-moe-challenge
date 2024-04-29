import ExamsHeader from '../components/examsHeader';
import ExamFooter from '../components/examFooter';
import '../css_files/Exam.css';
import ListeningExamParts from '../components/ListeningExamParts';
import { useState } from 'react';

export default function ListeningExam() {
  const [partNum, setPartNum] = useState('part1'); // Initial part

  // Function to handle part selection
  const handlePartSelect = (part: string) => {
    setPartNum(part);
  };

  return (
    <>
      <div>
        <ExamsHeader duration={40} />
      </div>
      <div className="Listening-Header">audio file</div>
      <h2>hello</h2>
      <div className="Listening-Questions-Part">
      <ListeningExamParts partNum={partNum} />
      </div>
      <ExamFooter onPartSelect={handlePartSelect} partNum="{partNum}" />
    </>
  );
}
