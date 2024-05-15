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
import { BsChevronUp } from 'react-icons/bs';

type setType = (arg: Answer[]) => void;

const ReadingQuestions = () => {
  // const { section, sk } = useParams();

  // TODO: this should be a parameter
  const parts = readingParts;

  const [partIndex, setPartIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

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
          key={i}
        >
          Part {i + 1}
        </button>
      ))}
    </div>
  );

  /* Maximize */
  const maximizeButton = (
    <div className="flex flex-row-reverse h-full items-center px-4">
      <button onClick={() => setIsMaximized(max => !max)}>
        <BsChevronUp
          className={`transition-all duration-500 ${
            isMaximized ? 'rotate-0' : 'rotate-180'
          }`}
          size={21}
        />
      </button>
    </div>
  );

  /* Screens */
  const passageScreen = (
    <div className="h-full">
      <div className="h-[90%] overflow-y-scroll p-8 max-lg:pb-0">
        <PassageComponent
          readingPart={parts[partIndex]}
          PartIndex={partIndex}
        />
      </div>
      {/* This is a separator so that content doesn't go till the divider on mobile and tablet view */}
      <div className="h-[10%] lg:hidden">{maximizeButton}</div>
    </div>
  );

  const questionsScreen = (
    <div className="h-full">
      {/* This is a separator so that content doesn't go till the divider on mobile and tablet view */}
      <div className="h-[10%] lg:hidden"></div>
      <div className="h-[90%] overflow-y-scroll p-8 max-lg:pt-0">
        <QuestionsComponent
          questions={parts[partIndex].Questions}
          answers={answers[partIndex]}
          setAnswers={indexSet(partIndex)}
        />
      </div>
    </div>
  );

  /* Split Screen containers */
  const containerStyles =
    'w-full lg:w-1/2 lg:h-full transition-all duration-300';
  const passageContainerStyle =
    containerStyles + ' ' + (isMaximized ? 'max-h-[100%]' : 'max-h-[50%]');
  const questionsContainerStyle =
    containerStyles +
    ' bg-white rounded-3xl ' +
    (isMaximized ? 'max-h-[0%]' : 'max-h-[50%]');

  return (
    <>
      <div className="h-[6vh] bg-blue-4">{barContent}</div>
      <div className="flex flex-col lg:flex-row h-[94vh] w-screen overflow-y-hidden">
        <div className={passageContainerStyle}>{passageScreen}</div>
        <div className={questionsContainerStyle}>{questionsScreen}</div>
      </div>
    </>
  );
};

export default ReadingQuestions;
