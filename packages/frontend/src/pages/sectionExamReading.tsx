import SectionExam from './sectionExam';
import ExamBox from '../components/examBox';

export default function sectionExamReading() {
  return (
    <>
      <SectionExam />

      <ExamBox
        title="Reading Test 1"
        examDetails={{
          title: 'Reading Test 1',
          duration: '60 Minutes',
          parts: 3,
          questions: 40,
          link: '/ReadingExam',
        }}
      />
    </>
  );
}
