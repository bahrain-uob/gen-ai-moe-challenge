import React, { useState } from 'react';
import { QuestionListSelection } from '../../utilities/readingUtilities';

export const ListSelectionQuestionComponent = ({
  question,
  questionIndex,
}: {
  question: QuestionListSelection;
  questionIndex: number;
}) => {
  // Initialize state to hold the selection for each sub-question as an array of arrays to be in the same format as the tableCompletion component
  const [selections, setSelections] = useState<string[][]>(
    question.SubQuestions.map(() => ['']),
  );

  const generateSelectName = (rowIndex: number) => {
    return `select-${questionIndex}-${rowIndex}`;
  };

  const handleSelectionChange = (
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => {
    const newSelections = [...selections];
    newSelections[rowIndex][columnIndex] = value;
    setSelections(newSelections);
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
            <p>{subQuestion.QuestionText}</p>
            <select
              name={generateSelectName(index)}
              id={generateSelectName(index)}
              value={selections[index][0]} // Using [0] since each sub-question only has one answer
              onChange={e => handleSelectionChange(index, 0, e.target.value)}
            >
              <option value="">Select an answer</option>
              {subQuestion.Choices.map((choice, choiceIndex) => (
                <option key={choiceIndex} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};
