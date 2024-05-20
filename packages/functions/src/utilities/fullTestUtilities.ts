///  <reference path="../../../frontend/src/utilities.ts" />
///  <reference path="../../../frontend/src/utilities/LRUtilities.ts" />
import { LRQuestion } from '../../../frontend/src/utilities/LRUtilities';

export const examSections: examSection[] = [
  { type: 'listening', answer: 'listeningAnswer', time: 60 * 60 * 1000 },
  { type: 'reading', answer: 'readingAnswer', time: 60 * 60 * 1000 },
  { type: 'writing', answer: 'writingAnswer', time: 60 * 60 * 1000 },
  { type: 'speaking', answer: 'speakingAnswer', time: 60 * 60 * 1000 },
];

export type testSectionAnswer =
  | 'listeningAnswer'
  | 'readingAnswer'
  | 'writingAnswer'
  | 'speakingAnswer';

type testType = 'listening' | 'reading' | 'writing' | 'speaking';

type examSection = {
  type: testType;
  answer: testSectionAnswer;
  time: number;
};

export interface FullTestItem {
  PK: string;
  SK: string;
  questions: questions;

  speakingAnswer?: {
    start_time: string;
    end_time?: string;
    answer?: any; // SpeakingAnswer;
    feedback?: any; // SpeakingFeedback;
    status: FeedbackStatus;
  };
  writingAnswer?: WritingAnswer;
  listeningAnswer?: RLAnswer;
  readingAnswer?: RLAnswer;
}

type FeedbackStatus = 'In progress' | 'Auto submitted' | 'Submitted';

// type ReadingSection = [ReadingPart, ReadingPart, ReadingPart];
export type questions = {
  reading: any; // ReadingSection;
  writing: WritingSection;
  listening: any; // ListeningSection;
  speaking: any; // SpeakingSection;
};

export type ListeningSection = {
  PK: string;
  SK: string;
  P1: ListeningPart;
  P2: ListeningPart;
  P3: ListeningPart;
  P4: ListeningPart;
};

type ListeningPart = {
  NumOfQuestions: number;
  ScriptKey: string;
  Questions: LRQuestion[];
};

export type ReadingSection = {
  PK: string;
  SK: string;
  P1: ReadingPart;
  P2: ReadingPart;
  P3: ReadingPart;
};

type ReadingPart = {
  NumOfQuestions: number;
  PassageTitle: string;
  Passage: string;
  Questions: LRQuestion[];
};

export type SpeakingSection = {
  PK: string;
  SK: string;
  P1: SpeakingPart;
  P2: SpeakingPart;
  P3: SpeakingPart;
};

type SpeakingPart = {
  Task: {
    S3key: string;
    text: number;
  };
  Questions: {
    text: string;
    S3Key?: string;
  }[];
};

export interface WritingSection {
  PK: string;
  SK: string;
  P1: {
    Question: string;
    GraphDescription: string;
    GraphKey: string;
  };
  P2: {
    Question: string;
  };
}
export interface WritingAnswer {
  start_time: string;
  end_time?: string;
  answer?: {
    P1: string;
    P2: string;
  }; // WritingAnswer;
  feedback?: any; // WritingFeedback;
  status: FeedbackStatus;
}

//Reading and listening answer
export interface RLAnswer {
  start_time: string;
  end_time?: string;
  answer?: string[] | string[][];
  feedback?: any; // ListeningFeedback | ReadingFeedback;
  status: FeedbackStatus;
}

export interface SpeakingAnswer {
  start_time: string;
  end_time?: string;
  answer?: {
    P1: {
      audioFileNames: string[];
      questions: string[];
    };
    P2: {
      audioFileName: string;
      question: string;
    };
    P3: {
      audioFileNames: string[];
      questions: string[];
    };
  };
  feedback?: any; // SpeakingFeedback
  status: FeedbackStatus;
}
