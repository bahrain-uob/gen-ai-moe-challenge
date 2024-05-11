import { ReadingQuestion } from '../../utilities/readingUtilities';
import { ListeningQuestion } from '../../utilities/ListeningUtilities';
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
          {renderQuestionComponent(question)}
        </div>
      ))}
    </>
  );
};

const renderQuestionComponent = (
  question: ReadingQuestion | ListeningQuestion,
) => {
  switch (question.QuestionType) {
    case 'Table Completion':
      return <TableCompletionQuestionComponent question={question} />;
    case 'List Selection':
      return <ListSelectionQuestionComponent question={question} />;
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
