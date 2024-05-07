import { useState } from 'react';
import { Option, Question } from './PlacementTest';
import { sections as questions } from './Questions';

export const PLTestPage = () => {
  const [level, question] = getRandomQuestion();
  // console.log(level, question);
  const [cf, setCf] = useState([0, 0, 0, 0, 0, 0]);

  const handleClick = (option: Option) => {
    const cfCopy = [...cf];
    if (option.isCorrect) {
      for (let i = level; i < 6; i++) {
        cfCopy[i] = combineCf(cf[i], 0.3);
      }
    } else {
      for (let i = level - 1; i >= 0; i--) {
        cfCopy[i] = combineCf(cf[i], 0.3);
      }
    }
    setCf(cfCopy);
  };

  return (
    <>
      <DevPanel cf={cf} question={question} level={level} />
      <RenederQuestion question={question} handleClick={handleClick} />
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

const CFRLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const getRandomQuestion = (): [number, Question] => {
  const level = Math.floor(Math.random() * questions.length);
  const qArray = questions[level];
  const question = qArray[Math.floor(Math.random() * qArray.length)];
  return [level, question];
};

const combineCf = (a: number, b: number) => a + b - a * b;

const DevPanel = ({
  cf,
  question,
  level,
}: {
  cf: number[];
  question: Question;
  level: number;
}) => {
  const correctAnswer = question.options.findIndex(
    ({ isCorrect }) => isCorrect,
  );

  return (
    <>
      <div className="mb-16">
        <div>Question level: {CFRLevels[level]}</div>
        <div>Correct answer: {correctAnswer + 1}</div>
        <div>
          {cf.map((level, index) => (
            <div className="flex items-center mb-1">
              <div className="w-16">
                {CFRLevels[index]}, {level.toFixed(2)}
              </div>
              <div
                className="inline-block bg-blue-4 h-4 ml-2"
                style={{ width: 10 * level + 'rem' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
