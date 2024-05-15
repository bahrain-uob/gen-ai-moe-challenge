import React from 'react';
import {
  QuestionComponentInput,
  QuestionTableCompletion,
} from '../../utilities/LRUtilities';

export const TableCompletionQuestionComponent = ({
  question,
  answer,
  set,
}: QuestionComponentInput<QuestionTableCompletion>) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const newInputValues = [...answer] as string[][];
    newInputValues[rowIndex][columnIndex] = event.target.value;
    set(newInputValues);
  };

  const renderQuestionTextWithInputs = (text: string, rowIndex: number) => {
    const parts = text.split('-answer-');
    return parts.map((part, index) => {
      if (index === parts.length - 1) {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
      return (
        <React.Fragment key={index}>
          {part}
          <input
            type="text"
            value={answer[rowIndex][index] || ''} // Bind input value to state
            onChange={event => handleInputChange(event, rowIndex, index)} // Handle input change
            className="lr-input"
          />
        </React.Fragment>
      );
    });
  };
  console.log(answer);
  return (
    <div>
      <p>{question.Question}</p>
      <table>
        <tbody>
          {question.SubQuestions.map((subQuestion, rowIndex) => (
            <tr key={rowIndex}>
              <td>{subQuestion.RowTitle}</td>
              <td>
                {renderQuestionTextWithInputs(
                  subQuestion.QuestionText,
                  rowIndex,
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
