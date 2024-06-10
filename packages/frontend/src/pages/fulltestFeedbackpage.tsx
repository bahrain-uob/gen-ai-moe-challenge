import { sampleFullTest } from '../utilities/sampleFullTest';
import { DoubleCircles } from '../components/DoubleCirclesComponent';
import { calculateFinalScore, getEuropeanFrameworkGrade } from '../utilities/calculateFeedbackScore';

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

      const total = calculateFinalScore(sampleFullTest);

      // Determine what to display as the text based on the 'total' value
      let bandscore;
      if (total === 'error') {
        bandscore = 'Error'; // Handle the error case
      } else {
        bandscore = total.toFixed(2); // Convert number to string and format it
      }
      let CEFRdis;
      const CEFR= getEuropeanFrameworkGrade(sampleFullTest);
      if (CEFR === 'error') {
        CEFRdis = 'Error'; // Handle the error case
      } else {
        CEFRdis = CEFR; // Convert number to string and format it
      }

  return (
    <div>
      <DoubleCircles
        leftCircleProps={{
          value: 0 * 4,
          maxValue: 36,
          // TODO Don't hard-code a band score
          text: CEFRdis,
        }}
        rightCircleProps={{
          value: 0 * 4,
          maxValue: 36,
          text: bandscore,
        }}
      />
    </div>
  );
};

export default fulltestFeedback;
