import { useState } from 'react';
import { QuestionListSelection } from '../../utilities/readingUtilities';
import React from 'react';

export const ListSelectionQuestionComponent = ({
  question,
}: {
  question: QuestionListSelection;
}) => {
  // Initialize state to hold the selection for each sub-question as an array of arrays to be in the same format as the tableCompletion component
  const [selections, setSelections] = useState<string[]>(
    Array(question.SubQuestions.length).fill(''),
  );

  const handleSelectionChange = (index: number, value: string) => {
    const newSelections = [...selections];
    newSelections[index] = value;
    setSelections(newSelections);
  };

  // Function to render text with selects
  const renderQuestionTextWithSelects = (text: string, index: number) => {
    const parts = text.split('-answer-');
    return parts.map((part, partIndex) =>
      partIndex < parts.length - 1 ? (
        <React.Fragment key={partIndex}>
          {part}
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
      ) : (
        part
      ), // Render the last part without a select
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
