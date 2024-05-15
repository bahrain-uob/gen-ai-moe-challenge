import { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { readingParts } from '../utilities/readingUtilities';
import { PassageComponent } from '../components/Reading/PassageComponent';
import {
  Answer,
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';

type setType = (arg: Answer[]) => void;

const ReadingQuestions = () => {
  // const { section, sk } = useParams();

  // TODO: this should be a parameter
  const parts = readingParts;

  const [partIndex, setPartIndex] = useState(0);

  const [answers, setAnswers] = useState<Answer[][]>(
    parts.map(part => initialAnswer(part.Questions)),
  );

  const indexSet = function (i: number): setType {
    return (value: Answer[]) => {
      // console.log('Triggered with', { i, value });
      const arrCopy = [...answers];
      arrCopy[i] = value;
      setAnswers(arrCopy);
    };
  };

  const containerStyles = 'h-1/2 w-full lg:w-1/2 lg:h-full';

  /* Bar */
  const linkStyling =
    'px-5 transition-colors duration-200 flex items-center leading-normal ';
  const barContent = (
    <div className="flex flex-1 h-full font-montserrat text-md font-bold text-white">
      <span className={linkStyling + ' mr-auto'}>00:10</span>
      {parts.map((_, i) => (
        <button
          className={
            linkStyling +
            (i === partIndex
              ? 'bg-black bg-opacity-40'
              : 'hover:bg-black hover:bg-opacity-10')
          }
          onClick={() => setPartIndex(i)}
        >
          Part {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="h-[6vh] bg-blue-4">{barContent}</div>
      <div className="flex flex-col lg:flex-row h-[94vh] w-screen">
        <div className={containerStyles}>
          <div className="h-[90%] overflow-y-scroll p-8 pb-0">
            <PassageComponent
              readingPart={parts[partIndex]}
              PartIndex={partIndex}
            />
          </div>
          <div className="h-[10%]"></div>
        </div>
        <div className={containerStyles + ' bg-white rounded-3xl'}>
          <div className="h-[10%]"></div>
          <div className="h-[90%] overflow-y-scroll p-8 pt-0">
            <QuestionsComponent
              questions={parts[partIndex].Questions}
              answers={answers[partIndex]}
              setAnswers={indexSet(partIndex)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadingQuestions;
