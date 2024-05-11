import { useState } from 'react';
import { QuestionMultipleAnswers } from '../../utilities/readingUtilities';

export const MultipleAnswersQuestionComponent = ({
  question,
}: {
  question: QuestionMultipleAnswers;
}) => {
  // Initialize state as a 2D array to hold the selected values for each choice within each sub-question
  const [selections, setSelections] = useState<string[][]>(
    question.SubQuestions.map(subQuestion =>
      Array(subQuestion.CorrectAnswers.length).fill(''),
    ),
  );

  const handleCheckboxChange = (subQuestionIndex: number, choice: string) => {
    setSelections(prevSelections =>
      prevSelections.map((selectedChoices, index) => {
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
      }),
    );
  };

  console.log(selections);
  return (
    <div>
      <p>{question.Question}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, subIndex) => (
          <li key={subIndex}>
            <p>{subQuestion.QuestionText}</p>
            {subQuestion.Choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <label>
                  <input
                    type="checkbox"
                    checked={selections[subIndex].includes(choice)}
                    onChange={() => handleCheckboxChange(subIndex, choice)}
                  />
                  {choice}
                </label>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};
