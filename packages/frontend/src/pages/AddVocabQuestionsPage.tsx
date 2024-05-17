import React, { useState } from 'react';
import { toJSON } from '../utilities';
import { get, post } from 'aws-amplify/api';

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
  const [isError, setIsError] = useState(false);

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
    if (!questionText || !explanation || choices.some(choice => !choice.text)) {
      setResponse('Please fill in all fields.');
      setIsError(true);
      return;
    }
    if (!choices.some(choice => choice.isRight)) {
      setResponse('Please select the correct answer.');
      setIsError(true);
      return;
    }

    const rightChoice = choices.find(choice => choice.isRight)?.text;
    const sk = Math.random().toString(36).substr(2, 8); // Random eight-character mix of digits and letters

    const questionData = {
      PK: { S: `vocab${level}` },
      SK: { S: sk },
      question: { S: questionText },
      choices: { L: choices.map(choice => ({ S: choice.text })) },
      right_choice: { S: rightChoice },
      explanation: { S: explanation },
    };

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
      setResponse('Question added successfully!');
      setIsError(false);
    } catch (error) {
      if (error instanceof Error) {
        setResponse(error.message);
        setIsError(true);
      } else {
        setResponse('An unknown error occurred');
        setIsError(true);
      }
    }
  };

  const allFieldsFilled =
    questionText &&
    explanation &&
    choices.every(choice => choice.text) &&
    choices.some(choice => choice.isRight);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-6xl font-bold text-center mb-6 mt-4 text-black">
        Add Vocabulary Questions
      </h1>
      <div className="w-full max-w-3xl p-5 bg-gray-200 shadow-2xl rounded-lg">
        {response && (
          <p
            className={`text-xl mb-4 ${
              isError ? 'text-red-500' : 'text-green-500 font-bold'
            }`}
          >
            {response}
          </p>
        )}
        <div className="flex justify-between items-center">
          <select
            className="w-1/2 p-4 bg-blue-4 text-white text-xl rounded-md shadow mx-auto"
            value={level}
            onChange={e => setLevel(e.target.value)}
          >
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={questionText}
          onChange={e => setQuestionText(e.target.value)}
          placeholder="Enter the question"
          className="w-full p-4 bg-blue-4 text-white text-xl rounded-md shadow my-6"
        />
        {choices.map((choice, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 mb-6 items-center">
            <input
              type="text"
              value={choice.text}
              onChange={e => handleChoiceTextChange(index, e.target.value)}
              placeholder={`Choice ${index + 1}`}
              className="col-span-4 p-4 bg-blue-4 text-white text-xl rounded-md shadow"
            />
            <input
              type="radio"
              name="rightAnswer"
              checked={choice.isRight}
              onChange={() => handleRightAnswerChange(index)}
              className="form-radio h-5 w-5 text-blue-600"
            />
          </div>
        ))}
        <textarea
          value={explanation}
          onChange={e => setExplanation(e.target.value)}
          placeholder="Enter the explanation"
          rows={4}
          className="w-full p-4 bg-blue-4 text-white text-xl rounded-md shadow mb-6"
        />
        <button
          onClick={submitQuestion}
          disabled={!allFieldsFilled}
          className={`w-full px-8 py-4 rounded-md bg-blue-4 text-white text-2xl hover:bg-blue-3 transition shadow ${
            !allFieldsFilled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Submit Question
        </button>
      </div>
    </div>
  );
};

export default AddVocabQuestionsPage;
