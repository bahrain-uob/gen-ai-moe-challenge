import '../css_files/Exam.css';
import ExamsHeader from '../components/examsHeader';
import '../css_files/reset.css';
import ExamFooter from '../components/examFooter';
import ReadingExamParts from '../components/ReadingExamParts';
import { useState } from 'react';

export default function ReadingExam() {
  const [partNum, setPartNum] = useState('part1'); // Initial part

  // Function to handle part selection
  const handlePartSelect = (part: string) => {
    setPartNum(part);
  };

  return (
    <div className="Reading-Exam-Container ">
      <ExamsHeader duration={60} />

      <ReadingExamParts partNum={partNum} />
      <ExamFooter onPartSelect={handlePartSelect} partNum={partNum} />
    </div>
  );
}
