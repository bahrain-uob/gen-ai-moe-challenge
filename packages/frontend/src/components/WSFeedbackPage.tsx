import { useState } from 'react';
import {
  SpeakingFeedbackAll,
  WritingFeedbackAll,
} from '../../../functions/src/utilities/fullTestUtilities';
import { Button } from './Button';
import { BackButton } from './TestComponents';
import { WSFeedbackComponent, isWritingFeedback } from './WSFeedback';

type WSFeedbackPageProps = {
  feedback: SpeakingFeedbackAll | WritingFeedbackAll;
  onBack: () => void;
};

export const WSFeedbackPage: React.FC<WSFeedbackPageProps> = ({
  feedback,
  onBack,
}) => {
  const [feedbackIndex, setFeedbackIndex] = useState(0);

  const buttonLabel = isWritingFeedback(feedback[0]) ? 'Task' : 'Part';
  const pageHeader = (
    <div className="flex">
      <BackButton onBack={onBack} />

      <div className="ml-auto"></div>

      {feedback.map((_, index) => (
        <Button
          onClick={() => setFeedbackIndex(index)}
          key={index}
          isTransparent={index !== feedbackIndex}
        >
          {buttonLabel} {index + 1}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <div className="mb-12">{pageHeader}</div>
      <WSFeedbackComponent feedback={feedback[feedbackIndex]} />
    </>
  );
};
