import { QuestionTableCompletion } from '../../utilities/readingUtilities';

export const TableCompletionQuestionComponent = ({
  question,
}: {
  question: QuestionTableCompletion;
}) => {
  return <p>{JSON.stringify(question)}</p>;
};
