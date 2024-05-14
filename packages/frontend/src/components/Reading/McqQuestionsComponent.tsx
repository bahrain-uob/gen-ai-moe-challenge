import React from 'react';
import {
  QuestionComponentInput,
  QuestionMultipleChoice,
} from '../../utilities/readingUtilities';

export const McqQuestionsComponent = ({
  question,
  answer,
  set,
}: QuestionComponentInput<QuestionMultipleChoice>) => {
  const handleSelectionChange = (subQuestionIndex: number, value: string) => {
    const newSelections = [...answer] as string[];
    newSelections[subQuestionIndex] = value;
    // setSelections(newSelections);
    set(newSelections);
  };
  // Render choices as radio buttons, each on a new line
  const renderRadioButtons = (choices: string[], index: number) => (
    <div>
      {choices.map((choice, choiceIndex) => (
        <div key={choiceIndex} style={{ marginBottom: '5px' }}>
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value={choice}
              checked={answer[index] === choice}
              onChange={e => handleSelectionChange(index, e.target.value)}
            />
            {choice}
          </label>
        </div>
      ))}
    </div>
  );

  // Render choices as a select list that replaces '-answer-'
  const renderQuestionTextWithSelects = (text: string, index: number) => {
    const textBeforeAnswer = text.slice(0, text.indexOf('-answer-'));

    return (
      <React.Fragment>
        {textBeforeAnswer}
        <select
          value={answer[index]}
          onChange={e => handleSelectionChange(index, e.target.value)}
        >
          <option value="">Select an answer</option>
          {question.SubQuestions[index].Choices.map((choice, choiceIndex) => (
            <option key={choiceIndex} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  };
  console.log(answer);
  return (
    <div>
      <p>{question.Question}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            {question.QuestionType === 'Multiple Choice' ? (
              <p>{subQuestion.QuestionText}</p> // Text for Multiple Choice
            ) : null}
            {question.QuestionType === 'Multiple Choice'
              ? renderRadioButtons(subQuestion.Choices, index)
              : renderQuestionTextWithSelects(subQuestion.QuestionText, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};
