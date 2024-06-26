///  <reference path="../../../frontend/src/utilities/LRUtilities.ts" />
import {
  RLError,
  SpeakingFeedback,
  WritingFeedback,
} from '../../../frontend/src/utilities/types';
import { LRQuestion } from '../../../frontend/src/utilities/LRUtilities';

export const examSections: examSection[] = [
  {
    type: 'listening',
    answer: 'listeningAnswer',
    time: 30 * 60 * 1000,
    initAnswer: '',
  },
  {
    type: 'reading',
    answer: 'readingAnswer',
    time: 60 * 60 * 1000,
    initAnswer: '',
  },
  {
    type: 'writing',
    answer: 'writingAnswer',
    time: 60 * 60 * 1000,
    initAnswer: { P1: '', P2: '' },
  },
  {
    type: 'speaking',
    answer: 'speakingAnswer',
    time: 30 * 60 * 1000,
    initAnswer: {
      P1: { audioFileNames: [], questions: [] },
      P2: { audioFileName: '', question: '' },
      P3: { audioFileNames: [], questions: [] },
    },
  },
];

export const examSectionObject = {
  listening: examSections[0],
  reading: examSections[1],
  writing: examSections[2],
  speaking: examSections[3],
};

export type testSectionAnswer =
  | 'listeningAnswer'
  | 'readingAnswer'
  | 'writingAnswer'
  | 'speakingAnswer';

export type testType = 'listening' | 'reading' | 'writing' | 'speaking';

type examSection = {
  type: testType;
  answer: testSectionAnswer;
  time: number;
  initAnswer: any;
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

export interface SectionTestItem {
  PK: string;
  SK: string;
  questions: SectionQuestions;
  type: testType;
  listeningAnswer?: RLAnswer;
  readingAnswer?: RLAnswer;
  writingAnswer?: WritingAnswer;
  speakingAnswer?: SpeakingAnswer;
}

type FeedbackStatus = 'In progress' | 'Auto-submitted' | 'Submitted';

// type ReadingSection = [ReadingPart, ReadingPart, ReadingPart];
export type questions = {
  reading: ReadingSection; // ReadingSection;
  writing: WritingSection;
  listening: ListeningSection; // ListeningSection;
  speaking: SpeakingSection; // SpeakingSection;
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
  P1: SpeakingPartAudio;
  P2: SpeakingPartCard;
  P3: SpeakingPartAudio;
};

export type SpeakingPartAudio = {
  Task: {
    S3key: string;
    text: string;
  };
  Questions: {
    text: string;
    S3key: string;
  }[];
};

export type SpeakingPartCard = {
  Task: {
    S3key: string;
    text: string;
  };
  Questions: string[];
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
export type WritingAnswer = {
  start_time: number;
  end_time?: number;
  answer?: {
    P1: string;
    P2: string;
  }; // WritingAnswer;
  feedback?: WritingFeedbackAll; // WritingFeedback;
  status: FeedbackStatus;
};

//Reading and listening answer
export interface RLAnswer {
  start_time: number;
  end_time?: number;
  answer?: any;
  feedback?: RLFeedbackAll; // ListeningFeedback | ReadingFeedback;
  status: FeedbackStatus;
}

export type SpeakingAnswer = {
  start_time: number;
  end_time?: number;
  answer?: {
    P1: SpeakingAudioAnswer;
    P2: SpeakingCardAnswer;
    P3: SpeakingAudioAnswer;
  };
  feedback?: SpeakingFeedbackAll; // SpeakingFeedback
  status: FeedbackStatus;
};
export type SpeakingAudioAnswer = {
  audioFileNames: string[];
  questions: string[];
};
export type SpeakingCardAnswer = {
  audioFileName: string;
  question: string;
};

export type SpeakingFeedbackAll = SpeakingFeedback[];

export type WritingFeedbackAll = WritingFeedback[];

export type RLFeedbackAll =
  | {
      CorrectAnswers: any[]; //allCorrectAnswers;
      studentAnswers: any; //studentAnswers;
      scores: number[]; //allScores;
      totalScore: number; //totalScore;
      BandScore: number; //bandScore;
      europeanFrameworkGrade: 'C1' | 'C2' | 'B2' | 'B1' | 'A1' | 'A2'; //europeanFrameworkGrade;
    }
  | RLError;

export type generalFullTestError =
  | {
      statusCode: 400;
      error:
        | 'No body found'
        | 'No test ID provided'
        | 'No user specified'
        | 'No answer provided'
        | 'No type provided'
        | 'No section in progress'
        | 'You are in wrong section'
        | 'Section is already submitted'
        | 'The test is finished'
        | 'You already have a test in progress' // In case of starting a new test without submitting the previous one
        | 'No section answer found' // In case there is no answer for the section in section test
        | 'Invalid test type'; // In case of providing invalid type to start section test
    }
  | {
      statusCode: 500;
      error: 'Exam not found';
    }
  | {
      type: 'listening' | 'reading' | 'writing' | 'speaking';
      data: 'Auto-Submitted';
    }; // In case that the test is auto submitted

export type getQuestionResponse = {
  type: 'listening' | 'reading' | 'writing' | 'speaking';
  data: {
    question:
      | WritingSection
      | ReadingSection
      | ListeningSection
      | SpeakingSection;
    answer: WritingAnswer | RLAnswer | SpeakingAnswer;
  };
};

export type startFullTestResponse = {
  testID: string;
  type: 'listening';
  data: {
    question: ListeningSection;
  };
};

export type submitFullTestResponse = {
  type: 'listening' | 'reading' | 'writing' | 'speaking';
  data: 'Submitted';
};
export type SectionQuestions =
  | WritingSection
  | ReadingSection
  | ListeningSection
  | SpeakingSection;

export type startSectionTestResponse = {
  testID: string;
  type: testType;
  data: {
    question: SectionQuestions;
  };
};

export type previousTestsLists = {
  PK: string; // the user id
  SK: 'Tests';
  full?: previousTestsList;
  listening?: previousTestsList;
  reading?: previousTestsList;
  writing?: previousTestsList;
  speaking?: previousTestsList;
};

export type previousTestsListsFrontend = {
  PK: string; // the user id
  SK: 'Tests';
  full?: previousTestsListFrontend;
  listening?: previousTestsListFrontend;
  reading?: previousTestsListFrontend;
  writing?: previousTestsListFrontend;
  speaking?: previousTestsListFrontend;
};

export type previousTestsListFrontend = {
  inProgress: {
    testId: string; // Test id
    progress?: number;
  };
  previous: previousTests;
};

export type previousTestsList = {
  inProgress: string; // Test id
  previous: previousTests;
};

export type previousTests = {
  score: number;
  testId: string;
}[];
