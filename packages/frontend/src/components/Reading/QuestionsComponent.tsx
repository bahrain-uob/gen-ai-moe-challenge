import { ReadingQuestion } from '../../utilities/readingUtilities';

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
          <p>{JSON.stringify(question)}</p>
        </div>
      ))}
    </>
  );
};
