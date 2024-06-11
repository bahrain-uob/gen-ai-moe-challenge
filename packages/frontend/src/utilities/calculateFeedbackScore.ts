import {
  FullTestItem,
  RLFeedbackAll,
  SpeakingFeedbackAll,
  WritingFeedbackAll,
} from '../../../functions/src/utilities/fullTestUtilities';
import { isWSError } from './types';

export const calculateWritingFeedbackScore = (
  feedback: WritingFeedbackAll | undefined,
) => {
  if (!feedback) {
    return 0;
  }
  const p1score = isWSError(feedback[0]) ? 0 : feedback[0].score;
  const p2score = isWSError(feedback[1]) ? 0 : feedback[1].score;

  const writingfeedbackscore = 0.4 * p1score + 0.6 * p2score;

  return writingfeedbackscore;
};

export const calculateLRFeedbackScore = (
  feedback: RLFeedbackAll | undefined,
) => {
  const Score = !feedback || isWSError(feedback) ? 0 : feedback.BandScore;

  return Score;
};

export const calculateSpeakingFeedbackScore = (
  feedback: SpeakingFeedbackAll | undefined,
) => {
  if (!feedback) {
    return 0;
  }
  const p1score = isWSError(feedback[0]) ? 0 : feedback[0].score;
  const p2score = isWSError(feedback[1]) ? 0 : feedback[1].score;
  const p3score = isWSError(feedback[2]) ? 0 : feedback[2].score;

  const speakingfeedbackscore = 0.3 * p1score + 0.3 * p2score + 0.4 * p3score; // this needs confirmation from the speaking team

  return speakingfeedbackscore;
};

export const calculateFinalScore = (test: FullTestItem): number => {
  const readingFeedback = test.readingAnswer?.feedback;
  const writingFeedback = test.writingAnswer?.feedback;
  const speakingFeedback = test.speakingAnswer?.feedback;
  const listeningFeedback = test.listeningAnswer?.feedback;

  const writingScore = calculateWritingFeedbackScore(writingFeedback);
  const speakingScore = calculateSpeakingFeedbackScore(speakingFeedback);
  const readingScore =
    !readingFeedback || isWSError(readingFeedback)
      ? 0
      : readingFeedback.BandScore;
  const listeningScore =
    !listeningFeedback || isWSError(listeningFeedback)
      ? 0
      : listeningFeedback.BandScore;

  const total = readingScore + listeningScore + writingScore + speakingScore;

  return total / 4;
};

export const getEuropeanFrameworkGrade = (bandScore: number): string => {
  const CEFR = bandScore / 4;
  if (CEFR >= 8.5) {
    return 'C2';
  } else if (CEFR >= 7 && CEFR <= 8) {
    return 'C1';
  } else if (CEFR >= 5 && CEFR <= 6.5) {
    return 'B2';
  } else if (CEFR >= 4 && CEFR >= 4.5) {
    return 'B1';
  } else if (CEFR == 3) {
    return 'A2';
  } else {
    return 'A1';
  }
};
