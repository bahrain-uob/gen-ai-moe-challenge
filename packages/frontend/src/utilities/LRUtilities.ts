/**
 * Common type for the inputs of question components
 */
export type QuestionComponentInput<T extends LRQuestion> = {
  question: T;
  answer: Answer;
  set: SetAnswer;
  /**
   * If true the component will show the correct answers alongside the student
   * answers and will indicate whether his answers are true or not (used for
   * showing feedback).
   *
   * If false the component will allow the student to input his answers (used
   * for tests).
   */
  showCorrectAnswer?: boolean;
};

export type Answer = string[] | string[][];
export type SetAnswer = (answer: Answer) => void;

export interface ListeningPart {
  MyPartitionKey: string;
  MySortKey: string;
  NumOfQuestions: number;
  ScriptKey: string;
  Questions: LRQuestion[];
}
export interface ReadingPart {
  MyPartitionKey: string;
  MySortKey: string;
  NumOfQuestions: number;
  PassageTitle: string;
  Passage: string;
  Questions: LRQuestion[];
}

export type LRQuestion =
  | QuestionTableCompletion
  | QuestionListSelection
  | QuestionMultipleChoice
  | QuestionSummaryCompletion
  | QuestionMultipleAnswers
  | QuestionDiagramCompletion;

export interface QuestionTableCompletion {
  NumOfSubQuestions: number;
  Question: string;
  QuestionType: 'Table Completion';
  SubQuestions: SQTableCompletion[];
}
export interface SQTableCompletion {
  RowTitle: String;
  CorrectAnswers: string[][];
  QuestionText: string;
  /** @deprecated */
  QuestionWeight: number;
}

export interface QuestionListSelection {
  NumOfSubQuestions: number;
  Question: string;
  ListTitle: string;
  List: string;
  QuestionType: 'List Selection';
  SubQuestions: SQListSelection[];
}
export interface SQListSelection {
  CorrectAnswer: string;
  QuestionText: string;
  Choices: string[];
}

export interface QuestionMultipleChoice {
  NumOfSubQuestions: number;
  Question: string;
  QuestionType:
    | 'Multiple Choice'
    | 'Yes No Not Given'
    | 'True False Not Given'
    | 'Matching Paragraph Information'
    | 'Matching Headings';
  SubQuestions: SQMultipleChoice[];
}
export interface SQMultipleChoice {
  CorrectAnswer: string;
  QuestionText: string;
  Choices: string[];
}

export interface QuestionSummaryCompletion {
  NumOfSubQuestions: number;
  Question: string;
  QuestionType: 'Summary Completion' | 'Short Answers';
  SubQuestions: SQSummaryCompletion[];
}
export interface SQSummaryCompletion {
  CorrectAnswers: string[][];
  QuestionText: string;
  /** @deprecated */
  QuestionWeight: number;
}

export interface QuestionMultipleAnswers {
  NumOfSubQuestions: number;
  Question: string;
  QuestionType: 'Multiple Answers';
  SubQuestions: SQMultipleAnswers[];
}
export interface SQMultipleAnswers {
  Choices: string[];
  CorrectAnswers: string[][];
  QuestionText: string;
  /** @deprecated */
  QuestionWeight: number;
}

export interface QuestionDiagramCompletion {
  Diagram: string;
  NumOfSubQuestions: number;
  Question: string;
  QuestionType: 'Diagram Completion';
  SubQuestions: SQDiagramCompletion[];
}
export interface SQDiagramCompletion {
  CorrectAnswers: string[][];
  QuestionText: string;
  /** @deprecated */
  QuestionWeight: number;
}
