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
      // Student's answer
      if (showCorrectAnswer && answer[index] === choice) {
        style =
          correctAnswer === choice
            ? 'text-green-700'
            : 'text-red-700 line-through';
      }
      // Correct Answer
      else if (showCorrectAnswer && correctAnswer === choice) {
        style = 'text-green-700';
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

    // Determine the correct answer for the current sub-question
    const correctAnswer = question.SubQuestions[index].CorrectAnswer;

    // Determine the style for the select based on the selected answer
    let selectStyle;

    if (
      showCorrectAnswer &&
      answer[index].toString().trim() !== '' //if the default option is selected (the student did not select anything) no styling must be done
    ) {
      selectStyle =
        correctAnswer === answer[index]
          ? 'text-green-700'
          : 'text-red-700 line-through';
    } else {
      selectStyle = '';
    }

    return (
      <React.Fragment>
        {textBeforeAnswer}
        <select
          value={answer[index]}
          onChange={e => handleSelectionChange(index, e.target.value)}
          disabled={showCorrectAnswer} // Disable when showCorrectAnswer is true
          className={`lr-select ${selectStyle}`}
        >
          <option value="">{index + 1}</option>
          {question.SubQuestions[index].Choices.map((choice, choiceIndex) => (
            <option key={choiceIndex} value={choice}>
              {choice}
            </option>
          ))}
        </select>
        {showCorrectAnswer &&
          correctAnswer !== answer[index] && ( //display the correct answer in green beside the select list for subquestions that the student answered wrong or not answered at all
            <span className="text-green-700 ml-2">{correctAnswer}</span>
          )}
      </React.Fragment>
    );
  };

  console.log(answer);
  return (
    <div>
      
      <p style={{ fontWeight: 'bold' }}>{question.Question}</p>
      <hr/>
      <ul>
        {question.SubQuestions.map((subQuestion, index) => (
          <li key={index}>
            <hr/>
            <br />
            {question.QuestionType === 'Multiple Choice' ? (
              <p style={{ fontWeight: 'bold' }}>{subQuestion.QuestionText}</p> // Text for Multiple Choice
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
