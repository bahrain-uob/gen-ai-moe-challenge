import SectionExam from './sectionExam';
import ExamBox from '../components/examBox';

export default function sectionExamListening() {
  return (
    <>
      <SectionExam />
      <ExamBox
        title="Listening Test 1"
        examDetails={{
          title: 'Listening Test 1',
          duration: '40 Minutes',
          parts: 3,
          questions: 40,
          link: '/ListeningExam',
        }}
      />
    </>
  );
}
