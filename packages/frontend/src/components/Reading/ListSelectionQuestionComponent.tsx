import { QuestionListSelection } from '../../utilities/readingUtilities';

export const ListSelectionQuestionComponent = ({
  question,
}: {
  question: QuestionListSelection;
}) => {
  return <p>{JSON.stringify(question)}</p>;
};
