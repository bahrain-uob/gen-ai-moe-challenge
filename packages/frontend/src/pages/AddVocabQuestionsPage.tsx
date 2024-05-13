import React, { useState } from 'react';
import { toJSON } from '../utilities';
import { post } from 'aws-amplify/api';

interface ChoiceInput {
  text: string;
  isRight: boolean;
}

const AddVocabQuestionsPage: React.FC = () => {
  const [level, setLevel] = useState('A1');
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState<ChoiceInput[]>([
    { text: '', isRight: false },
    { text: '', isRight: false },
    { text: '', isRight: false },
    { text: '', isRight: false },
  ]);
  const [explanation, setExplanation] = useState('');
  const [response, setResponse] = useState('');

  const handleChoiceTextChange = (index: number, text: string) => {
    const newChoices = [...choices];
    newChoices[index].text = text;
    setChoices(newChoices);
  };

  const handleRightAnswerChange = (index: number) => {
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      isRight: i === index,
    }));
    setChoices(newChoices);
  };
  const submitQuestion = async () => {
    // Validation before sending
    if (!questionText || !explanation || choices.some(choice => !choice.text)) {
      setResponse('Please fill in all fields.');
      return;
    }
    if (!choices.some(choice => choice.isRight)) {
      setResponse('Please select the correct answer.');
      return;
    }

    const rightChoice = choices.find(choice => choice.isRight)?.text;
    const sk = Math.floor(1000 + Math.random() * 9000).toString(); // Random four-digit number as string

    const questionData = {
      PK: { S: `vocab${level}` },
      SK: { S: sk },
      question: { S: questionText },
      choices: { L: choices.map(choice => ({ S: choice.text })) },
      right_choice: { S: rightChoice },
      explanation: { S: explanation },
    };

    // Log the final JSON data to be sent
    console.log('Final JSON data to be sent:', JSON.stringify(questionData));

    try {
      const apiResponse = await toJSON(
        post({
          apiName: 'myAPI',
          path: '/addVocabQuestion',
          options: {
            headers: {
              'Content-Type': 'application/json',
            },
            body: questionData,
          },
        }),
      );
      setResponse(apiResponse.message);
    } catch (error) {
      // Check if the error is an instance of Error and thus has a message property
      if (error instanceof Error) {
        setResponse(error.message); // Now it's safe to access error.message
      } else {
        // If the error is not an Error object, handle it as an unknown error
        setResponse('An unknown error occurred');
      }
    }
  };

  // Check if all inputs are filled and at least one choice is marked as the correct answer
  const allFieldsFilled =
    questionText &&
    explanation &&
    choices.every(choice => choice.text) &&
    choices.some(choice => choice.isRight);

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Add Vocabulary Question</h1>
      <select
        value={level}
        onChange={e => setLevel(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      >
        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
        placeholder="Enter the question"
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      {choices.map((choice, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={choice.text}
            onChange={e => handleChoiceTextChange(index, e.target.value)}
            placeholder={`Choice ${index + 1}`}
            style={{ padding: '10px', width: 'calc(100% - 30px)' }}
          />
          <input
            type="radio"
            name="rightAnswer"
            checked={choice.isRight}
            onChange={() => handleRightAnswerChange(index)}
            style={{ marginLeft: '10px' }}
          />
        </div>
      ))}
      <textarea
        value={explanation}
        onChange={e => setExplanation(e.target.value)}
        placeholder="Enter the explanation"
        rows={4}
        style={{ marginBottom: '10px', padding: '10px', width: '100%' }}
      />
      <button
        onClick={submitQuestion}
        disabled={!allFieldsFilled}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: allFieldsFilled ? 'pointer' : 'not-allowed',
        }}
      >
        Submit Question
      </button>
      <p>Response: {response}</p>
    </div>
  );
};

export default AddVocabQuestionsPage;
