import React, { useState } from 'react';
import { QuestionListSelection } from '../../utilities/readingUtilities';

export const ListSelectionQuestionComponent = ({
  question,
}: {
  question: QuestionListSelection;
}) => {
  const [selections, setSelections] = useState<string[]>(
    Array(question.SubQuestions.length).fill(''),
  );

  const handleSelectionChange = (index: number, value: string) => {
    const newSelections = [...selections];
    newSelections[index] = value;
    setSelections(newSelections);
  };

  const renderQuestionTextWithSelects = (text: string, index: number) => {
    const textBeforeAnswer = text.slice(0, text.indexOf('-answer-'));
    return (
      <React.Fragment>
        {textBeforeAnswer}
        <select
          value={selections[index]}
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

  console.log(selections);
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
