///  <reference path="../../../frontend/src/utilities/LRUtilities.ts" />
import {
  SpeakingFeedback,
  WritingFeedback,
} from '../../../frontend/src/utilities';
import { LRQuestion } from '../../../frontend/src/utilities/LRUtilities';

export const examSections: examSection[] = [
  { type: 'listening', answer: 'listeningAnswer', time: 30 * 60 * 1000 },
  { type: 'reading', answer: 'readingAnswer', time: 60 * 60 * 1000 },
  { type: 'writing', answer: 'writingAnswer', time: 60 * 60 * 1000 },
  { type: 'speaking', answer: 'speakingAnswer', time: 30 * 60 * 1000 },
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

  speakingAnswer?: SpeakingAnswer;
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
  PK: 'listening';
  SK: string;
  P1: ListeningPart;
  P2: ListeningPart;
  P3: ListeningPart;
  P4: ListeningPart;
};

export type ListeningPart = {
  NumOfQuestions: number;
  ScriptKey: string;
  Questions: LRQuestion[];
};

export type ReadingSection = {
  PK: 'reading';
  SK: string;
  P1: ReadingPart;
  P2: ReadingPart;
  P3: ReadingPart;
};

export type ReadingPart = {
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
  feedback?: WritingFeedbackAll; // WritingFeedback;
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
  feedback?: SpeakingFeedbackAll; // SpeakingFeedback
  status: FeedbackStatus;
}

export interface SpeakingFeedbackAll {
  P1: SpeakingFeedback;
  P2: SpeakingFeedback;
  P3: SpeakingFeedback;
}

export interface WritingFeedbackAll {
  P1: WritingFeedback;
  P2: WritingFeedback;
}
