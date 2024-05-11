import React, { useState } from 'react';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';

// Define types for the response to ensure type safety
interface Question {
  question: string;
  choices: string[];
  right_choice: string;
  explanation: string;
}

const VocabularyPracticePage: React.FC = () => {
  const [questionType, setQuestionType] = useState<string>('vocabA1'); // Default value is 'vocabA1'
  const [question, setQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string>('');

  const fetchQuestion = async () => {
    try {
      const response = await toJSON(
        get({
          apiName: 'myAPI',
          path: `/question/${questionType}`,
        }),
      );
      setQuestion(response); // Assuming response is directly usable
    } catch (error: any) {
      console.error('Error fetching question:', error);
      setError(error.message || 'Unknown error');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <select
          value={questionType}
          onChange={e => setQuestionType(e.target.value)}
        >
          <option value="vocabA1">A1</option>
          <option value="vocabA2">A2</option>
          <option value="vocabB1">B1</option>
          <option value="vocabB2">B2</option>
          <option value="vocabC1">C1</option>
          <option value="vocabC2">C2</option>
        </select>
        <button onClick={fetchQuestion}>Get Question</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {question && (
          <div>
            <h3>Question: {question.question}</h3>
            <ul>
              {question.choices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
            <p>Correct Answer: {question.right_choice}</p>
            <p>Explanation: {question.explanation}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default VocabularyPracticePage;
