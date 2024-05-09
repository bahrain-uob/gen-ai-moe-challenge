import { QuestionSummaryCompletion } from '../../utilities/readingUtilities';

export const SummaryCompletionQuestionComponent = ({
  question,
}: {
  question: QuestionSummaryCompletion;
}) => {
  return <p>{JSON.stringify(question)}</p>;
};
