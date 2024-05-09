import { QuestionDiagramCompletion } from '../../utilities/readingUtilities';

export const DiagramCompletionQuestionComponent = ({
  question,
}: {
  question: QuestionDiagramCompletion;
}) => {
  return <p>{JSON.stringify(question)}</p>;
};
