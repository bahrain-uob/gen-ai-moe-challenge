import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './App.css';

interface Passage {
  passageText: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

interface Props {
  navigateTo: (destination: string) => void;
}

const ReadingExerciseContainer: React.FC<Props> = ({ navigateTo }) => {
  const passages: Passage[] = [
    {
      passageText:
        'Once upon a time, there was a little prince who lived on a small planet called B-612, Once upon a time, there was a little prince who lived on a small planet called B-612, Once upon a time, there was a little prince who lived on a small planet called B-612...',
      question: 'What is the name of the planet where the little prince lived?',
      answers: ['Earth', 'Mars', 'B-612', 'Jupiter'],
      correctAnswerIndex: 2,
    },
    {
      passageText:
        'The sun was shining on the sea, shining with all his might: he did his very best to make the billows smooth and bright...',
      question: 'Who is shining on the sea?',
      answers: ['The moon', 'The sun', 'The stars', 'The clouds'],
      correctAnswerIndex: 1,
    },

    {
      passageText:
        'It was a bright cold day in April, and the clocks were striking thirteen...',
      question: "Where does the story '1984' by George Orwell take place?",
      answers: ['London', 'New York City', 'Moscow', 'Oceania'],
      correctAnswerIndex: 3,
    },
    {
      passageText:
        'It was a dark and stormy night; the rain fell in torrents — except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets...',
      question: 'What was the weather like on that night?',
      answers: ['Sunny', 'Rainy', 'Snowy', 'Windy'],
      correctAnswerIndex: 1,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(passages.length).fill(null),
  );
  const [answered, setAnswered] = useState<boolean>(false);

  const handleAnswerSelection = (index: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(updatedAnswers);
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] !== null) {
      setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % passages.length);
      setAnswered(false);
    } else {
      alert('Please select an answer first!');
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(
      prevIndex => (prevIndex - 1 + passages.length) % passages.length,
    );
    setAnswered(true);
  };

  const handleCheckAnswer = () => {
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    if (selectedAnswer !== null) {
      const isCorrect =
        selectedAnswer === passages[currentQuestionIndex].correctAnswerIndex;
      alert(isCorrect ? 'Correct!' : 'Incorrect!');
    } else {
      alert('Please select an answer first!');
    }
  };

  return (
    <div className="reading-exercise-container">
      <div className="cancel-button" onClick={() => navigateTo('home')}>
        <FaTimes />
      </div>
      <div className="passage">
        <p>{passages[currentQuestionIndex].passageText}</p>
        <div className="question">
          <p>{passages[currentQuestionIndex].question}</p>
          <ul>
            {passages[currentQuestionIndex].answers.map((answer, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`answer-${index}`}
                  name="answer"
                  checked={selectedAnswers[currentQuestionIndex] === index}
                  onChange={() => handleAnswerSelection(index)}
                />
                <label htmlFor={`answer-${index}`}>{answer}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={handlePreviousQuestion}
          className="previous-button"
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleCheckAnswer}
          className="check-answer-button"
          disabled={!answered}
        >
          Check Answer
        </button>
        <button
          onClick={handleNextQuestion}
          className="next-button"
          disabled={!answered}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReadingExerciseContainer;
