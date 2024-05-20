import {
  QuestionComponentInput,
  QuestionMultipleAnswers,
  SQMultipleAnswers,
} from '../../utilities/LRUtilities';

export const MultipleAnswersQuestionComponent = ({
  question,
  answer,
  set,
  showCorrectAnswer,
}: QuestionComponentInput<QuestionMultipleAnswers>) => {
  const handleCheckboxChange = (subQuestionIndex: number, choice: string) => {
    if (!showCorrectAnswer) {
      const newSelections = answer.map((selectedChoices, index) => {
        if (index === subQuestionIndex) {
          const newChoices = [...selectedChoices];
          const foundIndex = newChoices.indexOf(choice);

          if (foundIndex !== -1) {
            // Choice is already selected, remove it
            newChoices.splice(foundIndex, 1);
            newChoices.push(''); // Maintain array length by adding an empty string
          } else {
            // Attempt to add new choice
            const emptyIndex = newChoices.indexOf('');
            if (emptyIndex !== -1) {
              newChoices[emptyIndex] = choice; // Replace first empty slot with new choice
            } else {
              alert(
                `You can only select up to ${selectedChoices.length} answers.`,
              );
              return selectedChoices; // Return old state if no room
            }
          }
          return newChoices;
        }
        return selectedChoices; // Return other sub-questions' choices unmodified
      });
      set(newSelections as string[]);
    }
  };

  const renderCheckboxes = (
    subQuestion: SQMultipleAnswers,
    subIndex: number,
  ) => {
    console.log(
      `all correctAnswers of subQuestion ${subIndex} : `,
      subQuestion.CorrectAnswers,
    );
    const correctAnswers = subQuestion.CorrectAnswers[0];
    console.log(`correctAnswers at  ${subIndex}: `, correctAnswers);
    console.log(`answer at ${subIndex}: `, answer[subIndex]);

    return subQuestion.Choices.map((choice, choiceIndex) => {
      let style = '';

      if (showCorrectAnswer) {
        if (answer[subIndex].includes(choice)) {
          style = correctAnswers.includes(choice)
            ? 'text-green-700'
            : 'text-red-700 line-through';
        } else if (correctAnswers.includes(choice)) {
          style = 'text-green-700';
        }
      }

      return (
        <div key={choiceIndex} style={{ marginBottom: '5px' }}>
          <label className={`cursor-pointer ${style}`}>
            <input
              type="checkbox"
              checked={answer[subIndex].includes(choice)}
              onChange={() => handleCheckboxChange(subIndex, choice)}
              disabled={showCorrectAnswer}
              className="mr-2"
            />
            {choice}
          </label>
        </div>
      );
    });
  };

  console.log(answer);
  return (
    <div>
      <p>{question.Question}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, subIndex) => (
          <li key={subIndex}>
            <p>{subQuestion.QuestionText}</p>
            {renderCheckboxes(subQuestion, subIndex)}
          </li>
        ))}
      </ul>
    </div>
  );
};
