import {
  FullTestItem,
  SpeakingFeedbackAll,
  WritingFeedbackAll,
} from '../../../functions/src/utilities/fullTestUtilities';
import { Feedback, SpeakingFeedback, isWSError } from './types';

export const calculateFeedbackScore = (feedback: WritingFeedbackAll) => {
  if (isWSError(feedback[0]) || isWSError(feedback[1])) {
    return '<> error </>;';
  }
  const writingfeedbackscore =
    0.4 * feedback[0].score + 0.6 * feedback[1].score;
  return writingfeedbackscore;
};

export const calculateFinalScore = (test: FullTestItem) => {
  const rl;
  if (isWSError()) const total = test.readingAnswer?.feedback.BandScore;
};
