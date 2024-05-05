import { WritingGrading } from '../utilities';

export const WritingFeedbackContainer = ({
  feedback,
}: {
  feedback: WritingGrading;
}) => {
  const pClassname = 'whitespace-pre-line ml-4 mb-8';
  const headingStyle = 'font-light mb-2';

  return (
    <>
      <h5 className={headingStyle}>Coherence & Cohesion</h5>
      <p className={pClassname}>{feedback['Coherence & Cohesion']}</p>
      <h5 className={headingStyle}>Grammatical Range & Accuracy</h5>
      <p className={pClassname}>{feedback['Grammatical Range & Accuracy']}</p>
      <h5 className={headingStyle}>Lexical Resource</h5>
      <p className={pClassname}>{feedback['Lexical Resource']}</p>
      <h5 className={headingStyle}>Task Responce</h5>
      <p className={pClassname}>{feedback['Task Responce']}</p>
      <h5 className={headingStyle}>Combined Feedback</h5>
      <p className={pClassname}>{feedback['Combined Feedback']}</p>
    </>
  );
};
