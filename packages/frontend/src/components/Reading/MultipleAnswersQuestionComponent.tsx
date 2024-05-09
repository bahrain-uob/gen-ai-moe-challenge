import { QuestionMultipleAnswers } from '../../utilities/readingUtilities';

export const MultipleAnswersQuestionComponent = ({
  question,
}: {
  question: QuestionMultipleAnswers;
}) => {
  return <p>{JSON.stringify(question)}</p>;
};
