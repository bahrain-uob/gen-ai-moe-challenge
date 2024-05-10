import { ReadingQuestion } from '../../utilities/readingUtilities';
import { ListSelectionQuestionComponent } from './ListSelectionQuestionComponent';
import { McqQuestionsComponent } from './McqQuestionsComponent';
import { TableCompletionQuestionComponent } from './TableCompletionQuestionComponent';
import { SummaryCompletionQuestionComponent } from './SummaryCompletionQuestionComponent';
import { MultipleAnswersQuestionComponent } from './MultipleAnswersQuestionComponent';
import { DiagramCompletionQuestionComponent } from './DiagramCompletionQuestionComponent';

export const QuestionsComponent = ({
  questions,
}: {
  questions: ReadingQuestion[];
}) => {
  return (
    <>
      {questions.map((question, index) => (
        <div key={index}>
          <p>Question {index + 1}:</p>
          {renderQuestionComponent(question, index)}
        </div>
      ))}
    </>
  );
};

const renderQuestionComponent = (question: ReadingQuestion, index: number) => {
  switch (question.QuestionType) {
    case 'Table Completion':
      return (
        <TableCompletionQuestionComponent
          question={question}
          questionIndex={index}
        />
      );
    case 'List Selection':
      return (
        <ListSelectionQuestionComponent
          question={question}
          questionIndex={index}
        />
      );
    case 'Multiple Choice':
    case 'Yes No Not Given':
    case 'True False Not Given':
    case 'Matching Paragraph Information':
    case 'Matching Headings':
      return <McqQuestionsComponent question={question} />;
    case 'Summary Completion':
    case 'Short Answers':
      return <SummaryCompletionQuestionComponent question={question} />;
    case 'Multiple Answers':
      return <MultipleAnswersQuestionComponent question={question} />;
    case 'Diagram Completion':
      return <DiagramCompletionQuestionComponent question={question} />;
    default:
      return <p>Unsupported question type</p>;
  }
};
