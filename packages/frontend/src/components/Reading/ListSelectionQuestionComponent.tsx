// import React, { useState } from 'react';
// import { QuestionListSelection } from '../../utilities/readingUtilities';
import {
  QuestionComponentInput,
  QuestionListSelection,
} from '../../utilities/readingUtilities';
import React from 'react';

export const ListSelectionQuestionComponent = ({
  question,
  answer,
  set,
}: QuestionComponentInput<QuestionListSelection>) => {
  const handleSelectionChange = (index: number, value: string) => {
    const newSelections = [...answer] as string[];
    newSelections[index] = value;
    // setSelections(newSelections);
    set(newSelections);
  };

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
      <h4>{question.ListTitle}</h4>
      <p className="whitespace-pre-line">{question.List}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            {renderQuestionTextWithSelects(subQuestion.QuestionText, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};
