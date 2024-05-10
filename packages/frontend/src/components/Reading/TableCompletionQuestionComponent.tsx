import React, { useState } from 'react';
import { QuestionTableCompletion } from '../../utilities/readingUtilities';

export const TableCompletionQuestionComponent = ({
  question,
  questionIndex,
}: {
  question: QuestionTableCompletion;
  questionIndex: number;
}) => {
  // initialize inputValues as an array of arrays, where each inner array corresponds to a row of input fields (a subQuestion) and it is filled with '' as an intital value for each input field.
  const [inputValues, setInputValues] = useState<string[][]>(
    question.SubQuestions.map(subQuestion => {
      // Calculate the number of input fields within the row
      const numInputs = (subQuestion.QuestionText.match(/-answer-/g) || [])
        .length;
      // Initialize the inner array with empty strings
      return Array(numInputs).fill('');
    }),
  );

  //a function to generate a unique name for each input field
  const generateInputName = (rowIndex: number, columnIndex: number) => {
    return `answer-${questionIndex}-${rowIndex}-${columnIndex}`;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[rowIndex][columnIndex] = event.target.value;
    setInputValues(newInputValues);
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
            name={generateInputName(rowIndex, index)}
            id={generateInputName(rowIndex, index)}
            value={inputValues[rowIndex][index] || ''} // Bind input value to state
            onChange={event => handleInputChange(event, rowIndex, index)} // Handle input change
          />
        </React.Fragment>
      );
    });
  };
  console.log(inputValues);
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
