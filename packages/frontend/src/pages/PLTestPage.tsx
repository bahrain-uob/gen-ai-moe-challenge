import { useState } from 'react';
import { Option, Question } from './PlacementTest';
import { sections as questions } from './Questions';
import { Link } from 'react-router-dom';
import FButton from '../components/FButton';
import TButton from '../components/TButton';

/**
 * What increments to use for each level
 *
 * First key specifies whether the student answered correctly or not. Second key specifies the question level.
 *
 *
 */
const knowledgeBase = {
  correct: {
    A1: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    A2: [-0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    B1: [-0.1, -0.1, 0.1, 0.1, 0.1, 0.1],
    B2: [-0.1, -0.1, -0.1, 0.1, 0.1, 0.1],
    C1: [-0.1, -0.1, -0.1, -0.1, 0.1, 0.1],
    C2: [-0.1, -0.1, -0.1, -0.1, -0.1, 0.1],
  },
  incorrect: {
    A1: [0.1, -0.1, -0.15, -0.15, -0.2, -0.2],
    A2: [0.1, 0.1, -0.1, -0.15, -0.2, -0.2],
    B1: [0.1, 0.1, 0.1, -0.1, -0.15, -0.2],
    B2: [0.1, 0.1, 0.1, 0.1, -0.1, -0.15],
    C1: [0.1, 0.1, 0.1, 0.1, 0.1, -0.1],
    C2: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
  },
};

const CFRLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
type CFRLevel = (typeof CFRLevels)[number];

export const PLTestPage = () => {
  const [cf, setCf] = useState([0, 0, 0, 0, 0, 0]);
  const [questionCount, setQuestionCount] = useState(0);
  const selectedLevel = selectLevel(cf);
  const [level, question] = getRandomQuestion(selectedLevel);

  console.log('Selected level', CFRLevels[selectedLevel]);

  const handleClick = (option: Option) => {
    console.log(`correct: ${option.isCorrect}`);
    const CFRL = CFRLevels[selectedLevel] as CFRLevel;
    const t1 = option.isCorrect ? knowledgeBase.correct : knowledgeBase.incorrect;
    const increments = t1[CFRL];

    const cfCopy = increments.map((value, index) => combineCf(value, cf[index]));

    setCf(cfCopy);
    setQuestionCount(prevCount => prevCount + 1);
  };

  const highestScoringLevel = getHighestScoringLevel(cf);

  return (
    <>
      {questionCount < 20 ? (
        <>
          <main className="w-full h-full flex items-center flex-col">
            <div className="hidden">
              <DevPanel cf={cf} question={question} level={level} />
            </div>
            <div className="w-full flex justify-center pb-44">
              <h1 className="text-5xl font-bold text-[#363534]">Placement Test</h1>
            </div>
            <RenderQuestion question={question} handleClick={handleClick} />
          </main>
        </>
      ) : (
        <main className="w-full h-full flex items-center flex-col">
          <div className="w-1/2 flex flex-col items-center">
            <h3 className="font-bold text-4xl pb-12 max-sm:text-2xl">You are all set!</h3>
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <div className='w-full'><h4 className='text-2xl font-semibold max-sm:text-lg'>Your current level is</h4></div>
            <img
              src={`assets/Levels/${highestScoringLevel}.png`}
              alt={highestScoringLevel}
              className='w-60 pt-8'
            />
          </div>
          <div className='flex flex-row w-full justify-center items-center pt-36 gap-x-14'>
            <Link to="/home"><FButton label="View Plan" tag="3B828E"/></Link>
            <Link to="/home"><TButton label='Return Home'/></Link>
          </div>
        </main>
      )}
    </>
  );
};

const optionsStyle =
  'bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';
const RenderQuestion = ({
  question,
  handleClick,
}: {
  question: Question;
  handleClick: (option: Option) => void;
}) => (
  <div className="w-1/2 flex flex-col items-center">
    <div className="w-full">
      <h3 className="font-bold text-4xl pb-12 mx-10">{question.text}</h3>
      <h5 className="font-bold text-2xl pb-12 mx-10">{question.sub}</h5>
    </div>
    <div className="flex flex-row w-full flex-wrap justify-between">
      {question.options.map(option => {
        return (
          <div
            key={option.id}
            className={optionsStyle}
            onClick={() => handleClick(option)}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  </div>
);

const getRandomQuestion = (level?: number): [number, Question] => {
  if (level === undefined) {
    level = Math.floor(Math.random() * questions.length);
  }
  const qArray = questions[level];
  const question = qArray[Math.floor(Math.random() * qArray.length)];
  return [level, question];
};

const combineCf = (a: number, b: number) => {
  const c = a + b - a * b;
  return c > 0 ? c : 0;
};

const DevPanel = ({
  cf,
  question,
  level,
}: {
  cf: number[];
  question: Question;
  level: number;
}) => {
  const correctAnswer = question.options.findIndex(({ isCorrect }) => isCorrect);

  return (
    <>
      <div className="mb-16">
        <div>Question level: {CFRLevels[level]}</div>
        <div>Correct answer: {correctAnswer + 1}</div>
        <div>
          {cf.map((level, index) => (
            <div className="flex items-center mb-1" key={index}>
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

const selectLevel = (cf: number[]): number => {
  const cfObj = Object.entries(cf);

  // Sort in descending order
  cfObj.sort(([_, a], [__, b]) => {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });

  const topCf = cfObj.slice(0, 3);
  console.log(topCf);
  const level = topCf[Math.floor(Math.random() * topCf.length)][0];
  return Number(level);
};

const getHighestScoringLevel = (cf: number[]): CFRLevel => {
  const maxScore = Math.max(...cf);
  const maxIndex = cf.indexOf(maxScore);
  return CFRLevels[maxIndex];
};

export default PLTestPage;
