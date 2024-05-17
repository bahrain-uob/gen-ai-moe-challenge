import React from 'react';
import {
  QuestionComponentInput,
  QuestionTableCompletion,
} from '../../utilities/LRUtilities';

export const TableCompletionQuestionComponent = ({
  question,
  answer,
  set,
  showCorrectAnswer,
}: QuestionComponentInput<QuestionTableCompletion>) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
  ) => {
    if (!showCorrectAnswer) {
      const newInputValues = [...answer] as string[][];
      newInputValues[rowIndex][columnIndex] = event.target.value;
      set(newInputValues);
    }
  };

  const renderQuestionTextWithInputs = (text: string, rowIndex: number) => {
    const parts = text.split('-answer-');
    return parts.map((part, index) => {
      const correctAnswers =
        question.SubQuestions[rowIndex].CorrectAnswers[index] || [];

      const studentAnswer = answer[rowIndex][index]?.trim() || '';

      // Determine the style for the input based on the selected answer
      let inputStyle = '';
      if (showCorrectAnswer && studentAnswer !== '') {
        inputStyle = correctAnswers.includes(studentAnswer)
          ? 'text-green-700'
          : 'text-red-700 line-through';
      }

      return (
        <React.Fragment key={index}>
          <span style={{ whiteSpace: 'pre-line' }}>{part}</span>
          {index < parts.length - 1 && (
            <>
              <input
                type="text"
                placeholder="answer"
                value={studentAnswer}
                onChange={event => handleInputChange(event, rowIndex, index)} // Handle input change
                className={`lr-input ${inputStyle}`}
                disabled={showCorrectAnswer}
              />
              {showCorrectAnswer && !correctAnswers.includes(studentAnswer) && (
                <span className="text-green-700 ml-2">
                  {correctAnswers.join(' / ')}
                </span>
              )}
            </>
          )}
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
