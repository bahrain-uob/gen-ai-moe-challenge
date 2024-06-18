import {
  QuestionComponentInput,
  QuestionSummaryCompletion,
} from '../../utilities/LRUtilities';
import React from 'react';

export const SummaryCompletionQuestionComponent = ({
  question,
  answer,
  set,
  showCorrectAnswer,
}: QuestionComponentInput<QuestionSummaryCompletion>) => {
  const handleInputChange = (
    subQuestionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    // added an if statement that prevents changing the input values when showCorrectAnswer is true
    if (!showCorrectAnswer) {
      const newInputValues = [...answer] as string[][];
      newInputValues[subQuestionIndex] = [...newInputValues[subQuestionIndex]];
      newInputValues[subQuestionIndex][answerIndex] = value;
      // setInputValues(newInputValues);
      set(newInputValues);
    }
  };

  // Render question text with text inputs replacing '-answer-'
  const renderQuestionTextWithInputs = (
    text: string,
    subQuestionIndex: number,
  ) => {
    const parts = text.split('-answer-');
    return parts.map((part, partIndex) => {
      const correctAnswers =
        question.SubQuestions[subQuestionIndex].CorrectAnswers[partIndex] || [];

      const studentAnswer = answer[subQuestionIndex][partIndex]?.trim() || '';

      // Determine the style for the input based on the selected answer
      let inputStyle = '';
      if (showCorrectAnswer && studentAnswer !== '') {
        inputStyle = correctAnswers.includes(studentAnswer)
          ? 'text-green-700'
          : 'text-red-700 line-through';
      }

      return (
        <React.Fragment key={partIndex}>
          <span className="leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {part}
          </span>
          {partIndex < parts.length - 1 && (
            <>
              <input
                type="text"
                value={answer[subQuestionIndex][partIndex]}
                onChange={e =>
                  handleInputChange(subQuestionIndex, partIndex, e.target.value)
                }
                className={`lr-input ${inputStyle}`}
                disabled={showCorrectAnswer} // Disable the input field when showCorrectAnswer is true
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
      <p style={{ fontWeight: 'bold' }}>{question.Question}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            <p className="text-justify mt-5">
              {renderQuestionTextWithInputs(subQuestion.QuestionText, index)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
