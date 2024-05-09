import { QuestionMultipleChoice } from '../../utilities/readingUtilities';

export const McqQuestionsComponent = ({
  question,
}: {
  question: QuestionMultipleChoice;
}) => {
  return <p>{JSON.stringify(question)}</p>;
};
