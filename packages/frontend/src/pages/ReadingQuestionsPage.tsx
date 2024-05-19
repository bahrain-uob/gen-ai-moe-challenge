import { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { Answer } from '../utilities/LRUtilities';
import { readingParts } from '../utilities/LRSampleQuestions';
//import { listeningParts } from '../utilities/LRSampleQuestions';
import { PassageComponent } from '../components/Reading/PassageComponent';
import { post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import {
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import { useParams, useNavigate } from 'react-router-dom';
import { BsChevronUp, BsQuestionLg } from 'react-icons/bs';
import { TitleRow } from '../components/TestComponents';
import { Modal } from '../components/Modal';

type setType = (arg: Answer[]) => void;

const ReadingQuestions = () => {
  const { sk } = useParams();
  if (!sk) return;

  const navigate = useNavigate();

  // TODO: this should be a parameter
  const parts = readingParts; //listeningParts

  const [partIndex, setPartIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [helpIsOpen, setHelpIsOpen] = useState(false);

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

  const submitAnswers = async (sk: string) => {
    try {
      const payload = {
        studentAnswers: answers, // Assuming 'answers' is the nested array data you showed
      };
      const response = await toJSON(
        post({
          apiName: 'myAPI',
          path: `/answers/reading/${sk}`,
          options: {
            headers: {
              'Content-Type': 'application/json',
            },
            body: payload,
          },
        }),
      );
      console.log('Submit response:', response);
      alert('Answers submitted successfully!');
      navigate(`/scores/reading/${sk}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers.');
    }
  };

  /* Bar */
  const linkStyling =
    'px-3 lg:px-5 transition -colors duration-200 flex items-center leading-normal ';
  const barContent = (
    <div className="flex flex-1 h-full font-montserrat text-sm font-bold text-white">
      <button
        className={linkStyling + ' hover-darken'}
        onClick={() => setHelpIsOpen(true)}
      >
        <span>Help</span>
        <BsQuestionLg className="inline ml-2" size={16} />
      </button>
      <span className={linkStyling + ' mr-auto'}>00:10</span>
      {parts.map((_, i) => (
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

  const titleRow = (
    <TitleRow title="Reading Test" onSubmit={() => submitAnswers(sk)} />
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

  /* Screens
   * Note that I addded a separator so that will only be shown in mobile and
   * tablet views, so height had to be adjusted accordingly
   *
   * Also note that both screens take full available height and width.  Parent
   * of screen will set the correct height and width.
   */
  const passageScreen = (
    <div className="h-full">
      <div className="h-[90%] lg:h-full overflow-y-scroll p-8 max-lg:pb-0">
        <PassageComponent
          readingPart={parts[partIndex]}
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
          questions={parts[partIndex].Questions}
          answers={answers[partIndex]}
          setAnswers={indexSet(partIndex)}
          showCorrectAnswer={false}
        />
      </div>
    </div>
  );

  /* Split Screen containers
   *
   * Note that I'm using max height instead of height, to animate maximizing and
   * minimizing passage screen, in mobile and table view.
   *
   * In mobile view, height is dependent on wether the passage is maximised or
   * not, while in laptop screens always take full height.
   */
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
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="flex flex-col lg:flex-row h-[88svh] lg:h-[86svh] w-screen overflow-y-hidden">
        <div className={passageContainerStyle}>{passageScreen}</div>
        <div className={questionsContainerStyle}>{questionsScreen}</div>
      </div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage="This is help"
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};

export default ReadingQuestions;
