import { ChangeEvent, useState } from 'react';
import { WritingQuestion } from '../components/WritingQuestion';
import { BsChevronUp, BsQuestionLg } from 'react-icons/bs';
import { Modal } from '../components/Modal';
import { TitleRow } from '../components/TestComponents';
import { WritingSection } from '../../../functions/src/utilities/fullTestUtilities';

interface WritingPageProps {
  writingSection: WritingSection;
}

export const WritingPage: React.FC<WritingPageProps> = ({
  writingSection: __writingSection,
}) => {
  const writingSection = {
    task1: {
      question: __writingSection.P1.Question,
      graphDescription: __writingSection.P1.GraphDescription,
      graphUrl: __writingSection.P1.GraphKey,
    },
    task2: {
      question: __writingSection.P2.Question,
    },
  };

  const [currentTaskKey, setCurrentTaskKey] = useState<'task1' | 'task2'>(
    'task1',
  );
  const [answers, setAnswers] = useState<{ task1: string; task2: string }>({
    task1: '',
    task2: '',
  });
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentTaskKey]: e.target.value,
    }));
  };

  const handleTaskSwitch = (key: 'task1' | 'task2') => {
    setCurrentTaskKey(key);
  };

  const linkStyling =
    'px-3 lg:px-5 transition-colors duration-200 flex items-center leading-normal';
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
      <button
        className={
          linkStyling +
          (currentTaskKey === 'task1'
            ? ' bg-black bg-opacity-40'
            : ' hover-darken')
        }
        onClick={() => handleTaskSwitch('task1')}
      >
        Task 1
      </button>
      <button
        className={
          linkStyling +
          (currentTaskKey === 'task2'
            ? ' bg-black bg-opacity-40'
            : ' hover-darken')
        }
        onClick={() => handleTaskSwitch('task2')}
      >
        Task 2
      </button>
    </div>
  );
  const titleRow = <TitleRow title="Writing Test" onSubmit={() => {}} />;

  console.log('answers: ', answers);

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

  const questionScreen = (
    <div className="h-full">
      <div className="h-[90%] lg:h-full overflow-y-scroll p-8 max-lg:pb-0">
        <WritingQuestion task={writingSection[currentTaskKey]} />
      </div>
      {/* This is a separator so that content doesn't reach the divider */}
      <div className="h-[10%] lg:hidden">{maximizeButton}</div>
    </div>
  );
  const answerScreen = (
    <div className="h-full">
      {/* This is a separator so that content doesn't reach the divider */}
      <div className="h-[10%] lg:hidden"></div>
      <div className="h-[90%] lg:h-full overflow-y-scroll p-8 max-lg:pt-0">
        <section id="answer" className="mb-12">
          <form>
            <div className="flex justify-between">
              <h2 className="font-bold mb-6">Answer:</h2>
              <div className="flex flex-row-reverse font-extralight mb-4">
                {/* Word count is {answer.trim().split(/\s+/).length} */}
                Word count is {countWords(answers[`${currentTaskKey}`])}
              </div>
            </div>
            <textarea
              className="bg-white w-full h-[125lvh] p-4 mb-2 rounded-md border-2 resize-none outline-none"
              name="answer"
              placeholder="Write your answer here..."
              value={answers[`${currentTaskKey}`]}
              onChange={handleChange}
            />
          </form>
        </section>
      </div>
    </div>
  );

  const containerStyles =
    'w-full lg:w-1/2 lg:max-h-full transition-all duration-300 h-full';
  const questionContainerStyle =
    containerStyles + ' ' + (isMaximized ? 'max-h-[100%]' : 'max-h-[50%]');
  const answerContainerStyle =
    containerStyles +
    ' bg-white ' +
    (isMaximized ? 'max-h-[0%]' : 'max-h-[50%]');

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="flex flex-col lg:flex-row h-[88svh] lg:h-[86svh] w-screen overflow-y-hidden">
        <div className={questionContainerStyle}>{questionScreen}</div>
        <div className={answerContainerStyle}>{answerScreen}</div>
      </div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage={
          <div>
            <ul className="list-disc  mt-5 pr-10 pl-5">
              <li className="mt-4 text-justify">
                The Question is located on the left side of your screen, Read it
                carefully then write your answer in the text box on the right
                side of the screen
              </li>
              <li className="mt-4 text-justify">
                To navigate through different parts of the test, please press
                the buttons located in the top right corner of the screen.
              </li>
              <li className="mt-4 text-justify">
                When you have completed all parts of the test, click the
                'Submit' button located in the top right corner of the screen to
                finish and submit your answers.
              </li>
              <li className="mt-4  text-justify">
                The test will take about 60 minutes. You should aim to spend
                approximately 20 minutes on Task 1 and 40 minutes on Task 2.
              </li>
            </ul>
          </div>
        }
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};

const countWords = (str: string) =>
  str
    .replace(/[^A-Z0-9\s]/gi, '')
    .split(' ')
    .filter(n => n != '').length;
