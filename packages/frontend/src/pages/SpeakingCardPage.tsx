import { BsQuestionLg } from 'react-icons/bs';
import { MicButton } from '../components/MicButton';
import { TitleRow } from '../components/TestComponents';
import { useState } from 'react';
import { Modal } from '../components/Modal';

export const SpeakingCardPage = () => {
  const partIndex = 1;
  const parts = ['', '', ''];
  const q = {
    task: {
      text: 'Describe your favorite shopping center.',
    },
    questions: [
      'Where is this center?',
      'What is special about it?',
      'What do you do when you go there?',
      'What do people say about it?',
      'Explain why you think it is a good choice.',
    ],
  };

  const [helpIsOpen, setHelpIsOpen] = useState(false);

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
            linkStyling + (i === partIndex ? 'bg-black bg-opacity-40' : '')
          }
          key={i}
        >
          Part {i + 1}
        </button>
      ))}
    </div>
  );

  const titleRow = <TitleRow title="Speaking" />;

  const cardContent = (
    <>
      <h3 className="font-light text-lg mb-3 border-b-2">{q.task.text}</h3>
      <ul className="list-inside ml-4">
        {q.questions.map((question, index) => (
          <li key={index} className="list-disc mb-1">
            {question}
          </li>
        ))}
      </ul>
    </>
  );

  const pageBody = (
    <div className="flex flex-col h-full justify-evenly items-center px-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-backdrop py-4 px-6">
        {cardContent}
      </div>
      <MicButton className="shadow-backdrop" />
    </div>
  );

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="h-[82svh] lg:h-[80svh] w-screen">{pageBody}</div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage={
          <div>
          <ul className="list-disc mt-5 pr-10 pl-5">
            <li className='mt-4 text-justify'>A task card will be displayed on your screen with topics and questions to discuss. Take time to prepare your thoughts.</li>
            <li className='mt-4 text-justify'>When ready, click the microphone icon to start recording your response. Speak for up to 2 minutes, addressing all points and questions.</li>
            <li className='mt-4 text-justify'>To complete the test, submit your responses and exit the recording interface as instructed on the screen.</li>
            <li className='mt-4 text-justify'>Ensure clear and structured responses to demonstrate your language skills effectively.</li>
          </ul>
        </div>
        

        }
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};
