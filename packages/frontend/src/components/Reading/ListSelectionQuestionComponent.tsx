// import React, { useState } from 'react';
// import { QuestionListSelection } from '../../utilities/readingUtilities';
import {
  QuestionComponentInput,
  QuestionListSelection,
} from '../../utilities/LRUtilities';
import React from 'react';

export const ListSelectionQuestionComponent = ({
  question,
  answer,
  set,
  showCorrectAnswer,
}: QuestionComponentInput<QuestionListSelection>) => {
  const handleSelectionChange = (index: number, value: string) => {
    if (!showCorrectAnswer) {
      const newSelections = [...answer] as string[];
      newSelections[index] = value;
      // setSelections(newSelections);
      set(newSelections);
    }
  };

  const renderQuestionTextWithSelects = (text: string, index: number) => {
    const textBeforeAnswer = text.slice(0, text.indexOf('-answer-'));
    const correctAnswer = question.SubQuestions[index].CorrectAnswer;

    // Determine the style for the select based on the selected answer
    let selectStyle = '';
    if (showCorrectAnswer && answer[index].toString().trim() !== '') {
      //if the default option is selected (the student did not select anything) no styling must be done
      selectStyle =
        correctAnswer === answer[index]
          ? 'text-green-700'
          : 'text-red-700 line-through';
    }

    return (
      <React.Fragment>
        {textBeforeAnswer}
        <select
          value={answer[index]}
          onChange={e => handleSelectionChange(index, e.target.value)}
          className={`lr-select ${selectStyle}`}
          disabled={showCorrectAnswer}
        >
          <option value="">{index + 1}</option>
          {question.SubQuestions[index].Choices.map((choice, choiceIndex) => (
            <option key={choiceIndex} value={choice}>
              {choice}
            </option>
          ))}
        </select>
        {showCorrectAnswer && correctAnswer !== answer[index] && (
          <span className="text-green-700 ml-2">{correctAnswer}</span>
        )}
      </React.Fragment>
    );
  };

  console.log(answer);
  return (
    <div>
      <hr />
      <p style={{ fontWeight: 'bold' }}>{question.Question}</p>
      <hr />
      <h4>{question.ListTitle}</h4>
      <p className="whitespace-pre-line">{question.List}</p>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            <hr /><br />
            {renderQuestionTextWithSelects(subQuestion.QuestionText, index)}
          </li>
        ))}
        <br />
      </ul>
    </div>
  );
};
