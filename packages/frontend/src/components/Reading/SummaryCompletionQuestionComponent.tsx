import { QuestionSummaryCompletion } from '../../utilities/readingUtilities';
import React, { useState } from 'react';

export const SummaryCompletionQuestionComponent = ({
  question,
}: {
  question: QuestionSummaryCompletion;
}) => {
  // Initialize state as a 2D array to hold the input values for each answer within each sub-question
  const [inputValues, setInputValues] = useState<string[][]>(
    question.SubQuestions.map(subQuestion =>
      (subQuestion.QuestionText.match(/-answer-/g) || []).map(() => ''),
    ),
  );

  const handleInputChange = (
    subQuestionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[subQuestionIndex] = [...newInputValues[subQuestionIndex]];
    newInputValues[subQuestionIndex][answerIndex] = value;
    setInputValues(newInputValues);
  };

  // Render question text with text inputs replacing '-answer-'
  const renderQuestionTextWithInputs = (
    text: string,
    subQuestionIndex: number,
  ) => {
    const parts = text.split('-answer-');
    return parts.map((part, partIndex) => (
      <React.Fragment key={partIndex}>
        {part}
        {partIndex < parts.length - 1 && (
          <input
            type="text"
            value={inputValues[subQuestionIndex][partIndex]}
            onChange={e =>
              handleInputChange(subQuestionIndex, partIndex, e.target.value)
            }
            placeholder="Type your answer here"
          />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div>
      <p>{question.Question}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            <p>
              {renderQuestionTextWithInputs(subQuestion.QuestionText, index)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
