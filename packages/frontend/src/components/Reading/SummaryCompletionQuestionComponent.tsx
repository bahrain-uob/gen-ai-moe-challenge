import { QuestionSummaryCompletion } from '../../utilities/readingUtilities';
import React from 'react';
import { Answer, SetAnswer } from './QuestionsComponent';

export const SummaryCompletionQuestionComponent = ({
  question,
  answer,
  set,
}: {
  question: QuestionSummaryCompletion;
  answer: Answer;
  set: SetAnswer;
}) => {
  const handleInputChange = (
    subQuestionIndex: number,
    answerIndex: number,
    value: string,
  ) => {
    const newInputValues = [...answer] as string[][];
    newInputValues[subQuestionIndex] = [...newInputValues[subQuestionIndex]];
    newInputValues[subQuestionIndex][answerIndex] = value;
    // setInputValues(newInputValues);
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
           
            className="border border-blue-4 rounded  rounded-full"
          />
        )}
      </React.Fragment>
    ));
  };
  console.log(answer);
  return (
    <div>
      <p>{question.Question}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            <p className='text-justify mt-5 leading-loose'>
              {renderQuestionTextWithInputs(subQuestion.QuestionText, index)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
