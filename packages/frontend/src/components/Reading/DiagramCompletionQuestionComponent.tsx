import React from 'react';
import {
  QuestionComponentInput,
  QuestionDiagramCompletion,
} from '../../utilities/LRUtilities';

export const DiagramCompletionQuestionComponent = ({
  question,
  answer,
  set,
}: QuestionComponentInput<QuestionDiagramCompletion>) => {
  const handleInputChange = (
    subQuestionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    const newInputValues = [...answer] as string[][];
    newInputValues[subQuestionIndex] = [...newInputValues[subQuestionIndex]];
    newInputValues[subQuestionIndex][answerIndex] = value;
    set(newInputValues);
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
            value={answer[subQuestionIndex][partIndex]}
            onChange={e =>
              handleInputChange(subQuestionIndex, partIndex, e.target.value)
            }
            placeholder="answer"
          />
        )}
      </React.Fragment>
    ));
  };
  console.log(answer);
  return (
    <div>
      <p>{question.Question}</p>
      <img
        src={question.Diagram}
        alt="Question's Diagram"
        style={{ maxWidth: '100%' }}
      />
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
