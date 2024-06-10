import React, { useState } from 'react';
import { sampleChallenge } from '../utilities/sampleChallenge';
import { QuestionsComponent,initialAnswer } from '../components/Reading/QuestionsComponent';


const ChallengePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswer(sampleChallenge.tasks));

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, sampleChallenge.tasks.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const renderCurrentQuestion = () => {

    return (
        <>
      

      <QuestionsComponent
        questions={[sampleChallenge.tasks[currentQuestionIndex]]}
        answers={[answers[currentQuestionIndex]]}
        setAnswers={(newAnswers) => {
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

     <h1 className='text-3xl font-bold mb-10'>{sampleChallenge.type}</h1>
     

     <div>
        <button className='bg-blue-4 p-2 px-4 text-white font-bold my-5 mr-10 rounded-lg hover:cursor-pointer hover:bg-blue-500' onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Task 1
        </button>
        <button className='bg-blue-4 p-2 px-4 text-white font-bold my-5 mr-10 rounded-lg hover:cursor-pointer hover:bg-blue-500' onClick={handleNext} disabled={currentQuestionIndex === sampleChallenge.tasks.length - 1}>
          Task 2
        </button>
      </div>

      {sampleChallenge.type === 'Listening' && sampleChallenge.contextAudio && (
        <div className='my-5'>
          <audio src={sampleChallenge.contextAudio} controls className="audio-player" style={{ width: '100%' }} />
        </div>
      )}


      <div className='bg-white p-10 mb-5 rounded-lg shadow-md'>
      <h1 className='mb-3 text-xl font-bold text-center'>{sampleChallenge.contextTitle}</h1>  
      <h2>{sampleChallenge.context}</h2>
      </div>

      <div className='bg-white p-10 mb-10 rounded-lg shadow-md'>
      {renderCurrentQuestion()}
      </div>
     
    </div>
  );
};

export default ChallengePage;
