import { sampleFullTest } from '../utilities/sampleFullTest';
import { DoubleCircles } from '../components/DoubleCirclesComponent';
import { calculateFeedbackScore } from '../utilities/calculateFeedbackScore';

const fulltestFeedback = () => {
  const readingFeedback = sampleFullTest.readingAnswer?.feedback;
  const writingFeedback = sampleFullTest?.writingAnswer?.feedback;
  const listeningFeedback = sampleFullTest?.listeningAnswer?.feedback;
  const speakingFeedback = sampleFullTest?.speakingAnswer?.feedback;

  const readingScores =
    readingFeedback && !('error' in readingFeedback)
      ? readingFeedback.totalScore
      : null;

  const listeningScore =
    listeningFeedback && !('error' in listeningFeedback)
      ? listeningFeedback.totalScore
      : null;

  return (
    <div>
      <DoubleCircles
        leftCircleProps={{
          value: 0 * 4,
          maxValue: 36,
          // TODO Don't hard-code a band score
          text: 'B1',
        }}
        rightCircleProps={{
          value: 0 * 4,
          maxValue: 36,
          text: (0 * 4).toFixed() + ' / 36',
        }}
      />
    </div>
  );
};

export default fulltestFeedback;
