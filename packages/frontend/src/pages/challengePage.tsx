import React, { useState } from 'react';
import { sampleChallenge } from '../utilities/sampleChallenge';
import {
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import {Button} from '../components/Button';

const ChallengePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswer(sampleChallenge.tasks));

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex =>
      Math.min(prevIndex + 1, sampleChallenge.tasks.length - 1),
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const renderCurrentQuestion = () => {
    return (
      <>
        <QuestionsComponent
          questions={[sampleChallenge.tasks[currentQuestionIndex]]}
          answers={[answers[currentQuestionIndex]]}
          setAnswers={newAnswers => {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = newAnswers[0];
            setAnswers(updatedAnswers);
          }}
          showCorrectAnswer={false}
        />
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
            isActive={currentQuestionIndex===0}
            
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
          </Button>        </div>

          <Button className="my-5" >
          Submit
        </Button>
    

       
      </div>

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
