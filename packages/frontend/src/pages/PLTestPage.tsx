import { useState } from 'react';
import { Option, Question } from './PlacementTest';
import { sections as questions } from './Questions';

interface CF {
  A1: number;
  A2: number;
  B1: number;
  B2: number;
  C1: number;
  C2: number;
}

export const PLTestPage = () => {
  const rQuestion = getRandomQuestion();
  const [cf, setCf] = useState({
    A1: 0.05,
    A2: 0.1,
    B1: 0.2,
    B2: 0.3,
    C1: 0.6,
    C2: 1,
  });

  return (
    <>
      <DevPanel cf={cf} question={rQuestion} />
      <RenederQuestion question={rQuestion} handleClick={console.log} />
    </>
  );
};

const optionsStyle =
  'bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';
const RenederQuestion = ({
  question,
  handleClick,
}: {
  question: Question;
  handleClick: (option: Option, question: Question) => void;
}) => (
  <div className="w-1/2 flex flex-col items-center rounded-xl">
    <h3 className="font-bold text-4xl pb-12">{question.text}</h3>
    <h5 className="font-bold text-2xl pb-12">{question.sub}</h5>
    <div className="flex flex-row w-full flex-wrap justify-between">
      {question.options.map(option => {
        return (
          <div
            key={option.id}
            className={optionsStyle}
            onClick={() => handleClick(option, question)}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  </div>
);

// function optionClicked(text: any): void {
//   throw new Error('Function not implemented.');
// }

const getRandomQuestion = () => {
  const qArray = questions[Math.floor(Math.random() * questions.length)];
  const question = qArray[Math.floor(Math.random() * qArray.length)];
  return question;
};

const DevPanel = ({ cf, question }: { cf: CF; question: Question }) => {
  const correctAnswer = question.options.findIndex(
    ({ isCorrect }) => isCorrect,
  );

  return (
    <>
      <div className="mb-16">
        <span>Correct answer: {correctAnswer + 1}</span>
        <div>
          {Object.entries(cf).map(([level, prop]) => (
            <div className="flex items-center mb-1">
              <div className="w-16">
                {level}, {prop}
              </div>
              <div
                className="inline-block bg-blue-4 h-4 ml-2"
                style={{ width: 10 * prop + 'rem' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
