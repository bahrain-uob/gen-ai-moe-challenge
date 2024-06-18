import React from 'react';
import {
  QuestionComponentInput,
  QuestionDiagramCompletion,
} from '../../utilities/LRUtilities';

export const DiagramCompletionQuestionComponent = ({
  question,
  answer,
  set,
  showCorrectAnswer,
}: QuestionComponentInput<QuestionDiagramCompletion>) => {
  const handleInputChange = (
    subQuestionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    if (!showCorrectAnswer) {
      const newInputValues = [...answer] as string[][];
      newInputValues[subQuestionIndex] = [...newInputValues[subQuestionIndex]];
      newInputValues[subQuestionIndex][answerIndex] = value;
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
          {part}
          {partIndex < parts.length - 1 && (
            <>
              <input
                type="text"
                value={studentAnswer}
                onChange={e =>
                  handleInputChange(subQuestionIndex, partIndex, e.target.value)
                }
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
      <p style={{ fontWeight: 'bold' }}>{question.Question}</p>
      <img
        src={question.Diagram}
        alt="Question's Diagram"
        style={{ maxWidth: '100%' }}
      />
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            <hr /><br />
            <p>
              {renderQuestionTextWithInputs(subQuestion.QuestionText, index)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
