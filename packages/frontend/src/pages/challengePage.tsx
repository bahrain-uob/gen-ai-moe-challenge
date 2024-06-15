import React, { useState } from 'react';
import { sampleChallenge } from '../utilities/sampleChallenge';
import {
  renderQuestionComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import { Button } from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChallengePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswer(sampleChallenge.tasks));
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number[]>(
    Array(sampleChallenge.tasks.length).fill(0),
  );

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex =>
      Math.min(prevIndex + 1, sampleChallenge.tasks.length - 1),
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    setShowCorrectAnswer(true); //to show the correct answers after submit
    setIsSubmitted(true);
    calculateScore();
    toast.success('Your answers have been submitted successfully!');
  };

  const calculateScore = () => {
    const newScore = answers.map((answer, index) => {
      const task = sampleChallenge.tasks[index];
      let taskScore = 0;

      for (let subIndex = 0; subIndex < task.SubQuestions.length; subIndex++) {
        const subQuestion = task.SubQuestions[subIndex];

        if ('CorrectAnswer' in subQuestion) {
          // Handle single correct answer ( Multiple Choice, List Selection)
          const correctAnswer = subQuestion.CorrectAnswer;
          const userAnswer = answer[subIndex];
          if (userAnswer === correctAnswer) {
            taskScore += 1;
          }
        } else if (
          'CorrectAnswers' in subQuestion &&
          Array.isArray(subQuestion.CorrectAnswers)
        ) {
          // Handle multiple correct answers ( Diagram Completion, Summary Completion, Table Completion, Multiple Answers)
          for (
            let partIndex = 0;
            partIndex < subQuestion.CorrectAnswers.length;
            partIndex++
          ) {
            const correctAnswer = subQuestion.CorrectAnswers[partIndex];
            const userAnswer = answer[subIndex][partIndex]?.trim();
            if (correctAnswer.includes(userAnswer)) {
              taskScore += 1;
            }
          }
        }
      }

      return taskScore;
    });

    setScore(newScore);
  };

  const renderCurrentQuestion = () => {
    return (
      <>
        {renderQuestionComponent(
          sampleChallenge.tasks[currentQuestionIndex],
          answers[currentQuestionIndex],
          newAnswer => {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = newAnswer;
            setAnswers(updatedAnswers);
          },
          showCorrectAnswer,
        )}
      </>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">{sampleChallenge.type}</h1>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            NoBackground
            isActive={currentQuestionIndex === 0}
          >
            Task 1
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === sampleChallenge.tasks.length - 1}
            NoBackground
            isActive={currentQuestionIndex === sampleChallenge.tasks.length - 1}
          >
            Task 2
          </Button>{' '}
        </div>

        <Button className="my-5" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      {isSubmitted && (
        <div className="my-5 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-3">Scores</h2>
          {score.map((taskScore, index) => (
            <div key={index} className="text-gray-800">
              <span className="text-gray-900 font-semibold mr-2 mb-1">
                Task {index + 1}:
              </span>
              {taskScore} / {sampleChallenge.tasks[index].SubQuestions.length}
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
      {sampleChallenge.type === 'Listening' && sampleChallenge.contextAudio && (
        <div className="my-5">
          <audio
            src={sampleChallenge.contextAudio}
            controls
            className="audio-player"
            style={{ width: '100%' }}
          />
        </div>
      )}
      <div className="bg-white p-10 mb-5 rounded-lg shadow-md">
        <h1 className="mb-3 text-xl font-bold text-center">
          {sampleChallenge.contextTitle}
        </h1>
        <h2>{sampleChallenge.context}</h2>
      </div>
      <div className="bg-white p-10 mb-10 rounded-lg shadow-md">
        {renderCurrentQuestion()}
      </div>
    </div>
  );
};

export default ChallengePage;
