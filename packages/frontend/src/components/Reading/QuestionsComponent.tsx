import { ReadingQuestion } from '../../utilities/readingUtilities';
import { ListeningQuestion } from '../../utilities/ListeningUtilities';
import { ListSelectionQuestionComponent } from './ListSelectionQuestionComponent';
import { McqQuestionsComponent } from './McqQuestionsComponent';
import { TableCompletionQuestionComponent } from './TableCompletionQuestionComponent';
import { SummaryCompletionQuestionComponent } from './SummaryCompletionQuestionComponent';
import { MultipleAnswersQuestionComponent } from './MultipleAnswersQuestionComponent';
import { DiagramCompletionQuestionComponent } from './DiagramCompletionQuestionComponent';

export type Answer = string[] | string[][];
export type SetAnswer = (answer: Answer) => void;

export const QuestionsComponent = ({
  questions,
  answers,
  setAnswers,
}: {
  questions: ReadingQuestion[];
  answers: Answer[];
  setAnswers: (arg: Answer[]) => void;
}) => {
  const indexSetAnswer = function (i: number): SetAnswer {
    return (value: Answer) => {
      // console.log('Triggered with', { i, value });
      const arrCopy = [...answers];
      arrCopy[i] = value;
      setAnswers(arrCopy);
    };
  };

  return (
    <>
      {questions.map((question, index) => (
        <div key={index} className="mb-10">
          <p>
            Question {index + 1}, {question.QuestionType}:
          </p>
          {renderQuestionComponent(
            question,
            answers[index],
            indexSetAnswer(index),
          )}
        </div>
      ))}
    </>
  );
};

/** Returns the correct element for the given question type
 *
 * This requires `answer` and `setAnswer` to give children access to parent's
 * state
 */
const renderQuestionComponent = (
  question: ReadingQuestion | ListeningQuestion,
  answer: Answer,
  setAnswer: SetAnswer,
) => {
  switch (question.QuestionType) {
    case 'Table Completion':
      return (
        <TableCompletionQuestionComponent
          question={question}
          answer={answer}
          set={setAnswer}
        />
      );
    case 'List Selection':
      return (
        <ListSelectionQuestionComponent
          question={question}
          answer={answer}
          set={setAnswer}
        />
      );
    case 'Multiple Choice':
    case 'Yes No Not Given':
    case 'True False Not Given':
    case 'Matching Paragraph Information':
    case 'Matching Headings':
      return (
        <McqQuestionsComponent
          question={question}
          answer={answer}
          set={setAnswer}
        />
      );
    case 'Summary Completion':
    case 'Short Answers':
      return (
        <SummaryCompletionQuestionComponent
          question={question}
          answer={answer}
          set={setAnswer}
        />
      );
    case 'Multiple Answers':
      return (
        <MultipleAnswersQuestionComponent
          question={question}
          answer={answer}
          set={setAnswer}
        />
      );
    case 'Diagram Completion':
      return (
        <DiagramCompletionQuestionComponent
          question={question}
          answer={answer}
          set={setAnswer}
        />
      );
    default:
      return <p>Unsupported question type</p>;
  }
};

/** Returns the correct initial answer array for each question */
export function initialAnswer(questions: ReadingQuestion[]): Answer[] {
  return questions.map(q => {
    switch (q.QuestionType) {
      case 'Table Completion':
      case 'Summary Completion':
      case 'Short Answers':
      case 'Diagram Completion':
        return q.SubQuestions.map(subQuestion =>
          (subQuestion.QuestionText.match(/-answer-/g) || []).map(() => ''),
        );
      case 'Multiple Answers':
        return q.SubQuestions.map(subQuestion =>
          Array(subQuestion.CorrectAnswers.length).fill(''),
        );
      case 'List Selection':
      case 'Multiple Choice':
      case 'Yes No Not Given':
      case 'True False Not Given':
      case 'Matching Paragraph Information':
      case 'Matching Headings':
        return Array(q.SubQuestions.length).fill('');
      default:
        throw Error('Invalid question');
    }
  });
}
