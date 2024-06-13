import { sampleFullTest } from '../utilities/sampleFullTest';
import { DoubleCircles } from '../components/DoubleCirclesComponent';
import {
  calculateFinalScore,
  calculateLRFeedbackScore,
  calculateSpeakingFeedbackScore,
  calculateWritingFeedbackScore,
  getEuropeanFrameworkGrade,
} from '../utilities/calculateFeedbackScore';
import { Button } from '../components/Button';

const fulltestFeedback = () => {
  const readingFeedback = sampleFullTest.readingAnswer?.feedback;
  const writingFeedback = sampleFullTest?.writingAnswer?.feedback;
  const listeningFeedback = sampleFullTest?.listeningAnswer?.feedback;
  const speakingFeedback = sampleFullTest?.speakingAnswer?.feedback;

  const total = calculateFinalScore(sampleFullTest);

  const bandscore = total.toFixed(2);
  const CEFR = getEuropeanFrameworkGrade(total);
  const listeningBandScore = calculateLRFeedbackScore(listeningFeedback);
  const readingBandScore = calculateLRFeedbackScore(readingFeedback);
  const speakingBandScore = calculateSpeakingFeedbackScore(speakingFeedback);
  const writingBandScore = calculateWritingFeedbackScore(writingFeedback);

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto">
      <DoubleCircles
        leftCircleProps={{
          value: 0 * 4,
          maxValue: 36,
          text: CEFR,
        }}
        rightCircleProps={{
          value: 0 * 4,
          maxValue: 36,
          text: bandscore,
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {[
          {
            title: 'Listening',
            score: listeningBandScore,
            grade: getEuropeanFrameworkGrade(listeningBandScore),
          },
          {
            title: 'Reading',
            score: readingBandScore,
            grade: getEuropeanFrameworkGrade(readingBandScore),
          },
          {
            title: 'Speaking',
            score: speakingBandScore,
            grade: getEuropeanFrameworkGrade(speakingBandScore),
          },
          {
            title: 'Writing',
            score: writingBandScore,
            grade: getEuropeanFrameworkGrade(writingBandScore),
          },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md text-left flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-600">Score: {section.score}</p>
              <p className="text-gray-600">Grade: {section.grade}</p>
            </div>
            <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              More Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default fulltestFeedback;
