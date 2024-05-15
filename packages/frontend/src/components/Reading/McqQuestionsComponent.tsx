import React from 'react';
import {
  QuestionComponentInput,
  QuestionMultipleChoice,
  SQMultipleChoice,
} from '../../utilities/LRUtilities';

export const McqQuestionsComponent = ({
  question,
  answer,
  set,
  showCorrectAnswer,
}: QuestionComponentInput<QuestionMultipleChoice>) => {
  const handleSelectionChange = (subQuestionIndex: number, value: string) => {
    if (!showCorrectAnswer) {
      // Prevent changes when answers are being shown
      const newSelections = [...answer] as string[];
      newSelections[subQuestionIndex] = value;
      // setSelections(newSelections);
      set(newSelections);
    }
  };
  // Render choices as radio buttons, each on a new line
  const renderRadioButtons = (subQuestion: SQMultipleChoice, index: number) => {
    const choices = subQuestion.Choices;
    const correctAnswer = subQuestion.CorrectAnswer;

    const out = choices.map((choice, choiceIndex) => {
      console.log('>>>', { choice, correctAnswer }, choice === correctAnswer);
      let style;
      if (showCorrectAnswer && answer[index] === choice) {
        style =
          correctAnswer === choice
            ? 'text-green-700'
            : 'text-red-700 line-through';
      } else {
        style = '';
      }

      const input = (
        <input
          type="radio"
          name={`question-${index}`}
          value={choice}
          checked={answer[index] === choice}
          onChange={e => handleSelectionChange(index, e.target.value)}
          disabled={showCorrectAnswer} // Disable when showCorrectAnswer is true
          className="mr-2"
          // className={`mr-2 ${style}`}
        />
      );

      return (
        <div key={choiceIndex} style={{ marginBottom: '5px' }}>
          <label className={`cursor-pointer ${style}`}>
            {input}
            <span>{choice}</span>
          </label>
        </div>
      );
    });

    return <div>{out}</div>;
  };

  // Render choices as a select list that replaces '-answer-'
  const renderQuestionTextWithSelects = (text: string, index: number) => {
    const textBeforeAnswer = text.slice(0, text.indexOf('-answer-'));

    return (
      <React.Fragment>
        {textBeforeAnswer}
        <select
          value={answer[index]}
          onChange={e => handleSelectionChange(index, e.target.value)}
          disabled={showCorrectAnswer} // Disable when showCorrectAnswer is true
          className="lr-select"
        >
          <option value="">{index + 1}</option>
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
              ? renderRadioButtons(subQuestion, index)
              : renderQuestionTextWithSelects(subQuestion.QuestionText, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};
