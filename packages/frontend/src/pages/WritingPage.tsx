import { ChangeEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
//import { PointsBadge } from '../components/PointsBadge';
//import { WritingFeedback } from '../utilities';
//import useWebSocket from 'react-use-websocket';
//import { WSFeedbackComponent } from '../components/WSFeedback';
import { WritingQuestion } from '../components/WritingQuestion';
import { writingSection } from '../utilities';
import { BsChevronUp, BsQuestionLg } from 'react-icons/bs';
import { Modal } from '../components/Modal';
import { TitleRow } from '../components/TestComponents';

export function WritingPage({}) {
  const [currentTaskKey, setCurrentTaskKey] = useState<'task1' | 'task2'>(
    'task1',
  );
  const [answers, setAnswers] = useState<{ task1: string; task2: string }>({
    task1: '',
    task2: '',
  });
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Feedback from backend
  /* const [grading, setGrading] = useState<undefined | WritingFeedback>({
    // JSON.parse(
    //   '{"Coherence & Cohesion":"The student\'s answer received a score of 0.\\n\\nThe student did not provide any relevant message and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. The student\'s answer was essentially a blank response, and it appears that they did not attend or attempt the question in any way.\\n\\nIn conclusion, the student\'s answer is rated as 0 out of 10, as it fails to meet the minimum requirements for a response. The student did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message.","Grammatical Range & Accuracy":"Score: 0\\n\\nThe student did not attempt the question and provided an answer of 20 words or fewer. There is no rateable language evident in the student\'s response, and it is considered a non-response. Therefore, a score of 0 is assigned.","Lexical Resource":"The student\'s answer is rated as 0. The student provided an answer of 20 words or fewer, which is rated at Band 1 according to the rubric. The student did not attempt the question in any way, used a language other than English throughout, or where there is proof that a candidate\'s answer has been totally memorised. Therefore, a score of 0 is appropriate.","Task Responce":"The student\'s answer is rated as 0. The content is wholly unrelated to the prompt. There are no ideas, and there is little direct response to the question. The response is rated as 0 because it does not meet the minimum word count requirement of 20 words.","Grammer Tool Feedback":[{"message":"Possible spelling mistake found.","shortMessage":"Spelling mistake","replacements":[{"value":"answer"}],"offset":11,"length":6,"context":{"text":"This is my ansewr","offset":11,"length":6},"sentence":"This is my ansewr","type":{"typeName":"UnknownWord"},"rule":{"id":"MORFOLOGIK_RULE_EN_US","description":"Possible spelling mistake","issueType":"misspelling","category":{"id":"TYPOS","name":"Possible Typo"}},"ignoreForIncompleteSentence":false,"contextForSureMatch":0}],"Combined Feedback":"Here is a combined feedback for the student:\\n\\nYour response did not meet the minimum requirements for a response. You did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. In addition, your answer was very short, with only 20 words, and did not attempt the question in any way.\\n\\nTo improve your response, you should focus on providing a clear and concise message that is relevant to the prompt. You should also ensure that your writing is organized and well-structured, with a clear introduction, body, and conclusion. Additionally, you should use appropriate language and vocabulary to convey your ideas effectively.\\n\\nIf you have any questions or need further assistance, please do not hesitate to ask."}',
    // ),
    'Coherence & Cohesion': {
      score: 3,
      text: "The student's answer received a score of 0.\n\nThe student did not provide any relevant message and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. The student's answer was essentially a blank response, and it appears that they did not attend or attempt the question in any way.\n\nIn conclusion, the student's answer is rated as 0 out of 10, as it fails to meet the minimum requirements for a response. The student did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message.",
    },
    'Grammatical Range & Accuracy': {
      score: 4,
      text: "Score: 0\n\nThe student did not attempt the question and provided an answer of 20 words or fewer. There is no rateable language evident in the student's response, and it is considered a non-response. Therefore, a score of 0 is assigned.",
    },
    'Lexical Resource': {
      score: 2,
      text: "The student's answer is rated as 0. The student provided an answer of 20 words or fewer, which is rated at Band 1 according to the rubric. The student did not attempt the question in any way, used a language other than English throughout, or where there is proof that a candidate's answer has been totally memorised. Therefore, a score of 0 is appropriate.",
    },
    'Task Responce': {
      score: 2,
      text: "The student's answer is rated as 0. The content is wholly unrelated to the prompt. There are no ideas, and there is little direct response to the question. The response is rated as 0 because it does not meet the minimum word count requirement of 20 words.",
    },
    score: 3.75,
    'Combined Feedback':
      'Here is a combined feedback for the student:\n\nYour response did not meet the minimum requirements for a response. You did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. In addition, your answer was very short, with only 20 words, and did not attempt the question in any way.\n\nTo improve your response, you should focus on providing a clear and concise message that is relevant to the prompt. You should also ensure that your writing is organized and well-structured, with a clear introduction, body, and conclusion. Additionally, you should use appropriate language and vocabulary to convey your ideas effectively.\n\nIf you have any questions or need further assistance, please do not hesitate to ask.',
    'Grammer Tool Feedback': [
      {
        context: { text: 'My Ansewr si', offset: 3, length: 6 },
        message: 'Possible spelling mistake found.',
      },
    ],
  });
  */

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentTaskKey]: e.target.value,
    }));
  };

  //const socketUrl = useSocketUrl() as string;

  /*const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: event => console.log('opened', event),
    onClose: event => console.log('closed', event),
    onMessage: e => {
      console.log('event', e);
      const response = JSON.parse(e.data);
      console.log('message', response);
      if (response['Coherence & Cohesion']) {
        setGrading(response);
      }
    },
    shouldReconnect: () => true,
  });*/

  /*const handleSubmit = async (
    e?: FormEvent | MouseEvent<HTMLButtonElement>,
  ) => {
    if (e) e.preventDefault();
    sendMessage(
      JSON.stringify({
        action: 'gradeWriting',
        // data: { writingTask: 'Task 1', ...inputs },
        data: {
          writingTask: currentTaskKey,
          question: writingSection[currentTaskKey].question,
          answers,
        },
      }),
    );
    console.log('submitted anwers: ', answers);
  };*/

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

            {/* Submit button */}
            {/*<div className="text-center">
            <button
              type="submit"
              className="bg-white text-blue-4 px-12 py-1 rounded-full shadow-md select-none"
            >
              Submit
            </button>
      </div>*/}
          </form>
        </section>
        {/*
        {grading && (
          <section id="feedback">
            <h2 className="font-bold mb-6">Feedback:</h2>
            <WSFeedbackComponent feedback={grading} />
          </section>
        )}
      */}
      </div>
    </div>
  );

  const containerStyles =
    'w-full lg:w-1/2 lg:max-h-full transition-all duration-300';
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
        modalMessage="This is help"
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
}

const countWords = (str: string) =>
  str
    .replace(/[^A-Z0-9\s]/gi, '')
    .split(' ')
    .filter(n => n != '').length;
