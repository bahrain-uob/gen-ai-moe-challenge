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
  const [questionType, setQuestionType] = useState<string>('vocabA1');
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [initialFetch, setInitialFetch] = useState<boolean>(true);

  const fetchQuestion = async () => {
    try {
      const response = await toJSON(
        get({
          apiName: 'myAPI',
          path: `/question/${questionType}`,
        }),
      );
      setQuestion(response);
      setSelectedAnswer(''); // Reset selected answer on new question fetch
      setShowExplanation(false); // Reset explanation visibility
      setInitialFetch(false); // Remove initial fetch status
    } catch (error: any) {
      console.error('Error fetching question:', error);
      setError(error.message || 'Unknown error');
    }
  };

  const handleAnswer = (choice: string) => {
    setSelectedAnswer(choice);
    // Show explanation only if the chosen answer is not the right one
    setShowExplanation(choice !== question?.right_choice);
  };

  const getButtonClass = (choice: string) => {
    if (!selectedAnswer) return 'bg-blue-4 hover:bg-blue-2';
    if (choice === selectedAnswer) {
      return choice === question?.right_choice ? 'bg-green-400' : 'bg-red-500';
    }
    return choice === question?.right_choice
      ? 'bg-gray-400'
      : 'bg-blue-4 hover:bg-blue-2';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-6xl font-bold text-center mb-6 mt-4 text-black">
        Vocabulary Practice
      </h1>
      <div className="w-full max-w-3xl p-5 bg-gray-200 shadow-2xl rounded-lg">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select
            className="w-full p-4 bg-blue-4 text-white text-2xl rounded-md shadow"
            value={questionType}
            onChange={e => setQuestionType(e.target.value)}
            disabled={error !== ''}
          >
            <option value="vocabA1">A1</option>
            <option value="vocabA2">A2</option>
            <option value="vocabB1">B1</option>
            <option value="vocabB2">B2</option>
            <option value="vocabC1">C1</option>
            <option value="vocabC2">C2</option>
          </select>
          <button
            className="w-full px-8 py-4 rounded-md bg-blue-4 text-white text-2xl hover:bg-blue-3 transition shadow"
            onClick={fetchQuestion}
          >
            {initialFetch ? 'Get Question' : 'Next Question'}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {question && (
          <div className="text-center mt-4">
            <h3 className="text-3xl font-bold mb-4 text-black">
              {question.question}
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {question.choices.map((choice, index) => (
                <button
                  key={index}
                  style={{ textShadow: '1px 1px 2px black' }}
                  className={`p-4 border transition-colors rounded-md text-xl cursor-pointer shadow ${getButtonClass(
                    choice,
                  )}`}
                  onClick={() => handleAnswer(choice)}
                  disabled={selectedAnswer !== ''}
                >
                  {choice}
                </button>
              ))}
            </div>
            {showExplanation && (
              <div className="bg-gray-500 p-4 mt-4 rounded-md shadow-lg text-g text-white">
                {' '}
                <p
                  className="text-xl"
                  style={{ textShadow: '1px 1px 2px black' }}
                >
                  <span
                    style={{ color: 'red', fontSize: '1.4em', border: 'none' }}
                  >
                    {' '}
                    Incorrect:
                  </span>{' '}
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyPracticePage;
