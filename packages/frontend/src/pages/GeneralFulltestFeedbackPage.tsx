import { DoubleCircles } from '../components/DoubleCirclesComponent';
import {
  calculateFinalScore,
  calculateLRFeedbackScore,
  calculateSpeakingFeedbackScore,
  calculateWritingFeedbackScore,
  getEuropeanFrameworkGrade,
} from '../utilities/calculateFeedbackScore';
import { Button } from '../components/Button';
import { FullTestItem } from '../../../functions/src/utilities/fullTestUtilities';

type PageProps = {
  fullTestItem: FullTestItem;
  onListeningNavigate?: () => void;
  onReadingNavigate?: () => void;
  onSpeakingNavigate?: () => void;
  onWritingNavigate?: () => void;
};

export const GeneralFulltestFeedbackPage: React.FC<PageProps> = ({
  fullTestItem,
  onListeningNavigate,
  onReadingNavigate,
  onSpeakingNavigate,
  onWritingNavigate,
}) => {
  const readingFeedback = fullTestItem.readingAnswer?.feedback;
  const writingFeedback = fullTestItem.writingAnswer?.feedback;
  const listeningFeedback = fullTestItem.listeningAnswer?.feedback;
  const speakingFeedback = fullTestItem.speakingAnswer?.feedback;

  const total = calculateFinalScore(fullTestItem);

  const bandscore = total.toFixed(2);
  const CEFR = getEuropeanFrameworkGrade(total);
  const listeningBandScore = calculateLRFeedbackScore(listeningFeedback);
  const readingBandScore = calculateLRFeedbackScore(readingFeedback);
  const speakingBandScore = calculateSpeakingFeedbackScore(speakingFeedback);
  const writingBandScore = calculateWritingFeedbackScore(writingFeedback);

  const viewEntries = [
    {
      title: 'Listening',
      score: listeningBandScore,
      grade: getEuropeanFrameworkGrade(listeningBandScore),
      onNaviagte: onListeningNavigate,
    },
    {
      title: 'Reading',
      score: readingBandScore,
      grade: getEuropeanFrameworkGrade(readingBandScore),
      onNaviagte: onReadingNavigate,
    },
    {
      title: 'Speaking',
      score: speakingBandScore,
      grade: getEuropeanFrameworkGrade(speakingBandScore),
      onNaviagte: onSpeakingNavigate,
    },
    {
      title: 'Writing',
      score: writingBandScore,
      grade: getEuropeanFrameworkGrade(writingBandScore),
      onNaviagte: onWritingNavigate,
    },
  ];

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
        {viewEntries.map((section, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md text-left flex max-sm:flex-col md:items-center justify-between"
          >
            <div className="max-sm:mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-600">Score: {section.score}</p>
              <p className="text-gray-600">Grade: {section.grade}</p>
            </div>
            <Button onClick={section.onNaviagte}>More Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
