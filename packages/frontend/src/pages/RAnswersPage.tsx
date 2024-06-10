import { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { PassageComponent } from '../components/Reading/PassageComponent';
import { BsChevronUp, BsQuestionLg } from 'react-icons/bs';
import { QuestionsComponent } from '../components/Reading/QuestionsComponent';
import { BsArrowLeft } from 'react-icons/bs';
import { ReadingPart } from '../../../functions/src/utilities/fullTestUtilities';

type RAnswersPageProps = {
  readingParts: ReadingPart[];
  studentAnswers: any;
  onBack: () => void;
};

const RAnswersPage: React.FC<RAnswersPageProps> = ({
  readingParts,
  studentAnswers,
  onBack,
}) => {
  const [partIndex, setPartIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  const TitleRow = (
    <div className="w-full h-full flex items-center border-b-2">
      <div className="sm:w-1/3 w-1/2 h-full nav-item">
        <button className="hover:text-gray-700" onClick={onBack}>
          <BsArrowLeft className="inline mr-2" />
          <span>Back</span>
        </button>
      </div>
      <div className="w-1/2 sm:w-1/3 text-center font-light text-xl">
        <span>Reading Test Answers</span>
      </div>
    </div>
  );

  /* Bar */
  const linkStyling =
    'px-3 lg:px-5 transition -colors duration-200 flex items-center leading-normal ';
  const barContent = (
    <div className="flex flex-1 h-full font-montserrat text-sm font-bold text-white">
      <span className={linkStyling + ' hover-darken'}>
        <span>Help</span>
        <BsQuestionLg className="inline ml-2" size={16} />
      </span>
      <span className={linkStyling + ' mr-auto'}>00:10</span>
      {readingParts.map((_, i) => (
        <button
          className={
            linkStyling +
            (i === partIndex ? 'bg-black bg-opacity-40' : 'hover-darken')
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

  const passageScreen = (
    <div className="h-full">
      <div className="h-[90%] lg:h-full overflow-y-scroll p-8 max-lg:pb-0">
        <PassageComponent
          readingPart={readingParts[partIndex]}
          PartIndex={partIndex}
        />
      </div>
      {/* This is a separator so that content doesn't reach the divider */}
      <div className="h-[10%] lg:hidden">{maximizeButton}</div>
    </div>
  );
  const questionsScreen = (
    <div className="h-full">
      {/* This is a separator so that content doesn't reach the divider */}
      <div className="h-[10%] lg:hidden"></div>
      <div className="h-[90%] lg:h-full overflow-y-scroll p-8 max-lg:pt-0">
        <QuestionsComponent
          questions={readingParts[partIndex].Questions}
          answers={studentAnswers[partIndex]}
          setAnswers={studentAnswers[partIndex]}
          showCorrectAnswer={true}
        />
      </div>
    </div>
  );

  const containerStyles =
    'w-full lg:w-1/2 lg:max-h-full transition-all duration-300';
  const passageContainerStyle =
    containerStyles + ' ' + (isMaximized ? 'max-h-[100%]' : 'max-h-[50%]');
  const questionsContainerStyle =
    containerStyles +
    ' bg-white ' +
    (isMaximized ? 'max-h-[0%]' : 'max-h-[50%]');

  return (
    <>
      <div className="h-[6dvh] bg-blue-4">{barContent}</div>
      <div className="h-[6dvh] lg:h-[8dvh]">{TitleRow}</div>
      <div className="flex flex-col lg:flex-row h-[88dvh] lg:h-[86dvh] w-screen overflow-y-hidden">
        <div className={passageContainerStyle}>{passageScreen}</div>
        <div className={questionsContainerStyle}>{questionsScreen}</div>
      </div>
    </>
  );
};

export default RAnswersPage;
