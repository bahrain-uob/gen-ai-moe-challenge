import { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { TitleRow } from '../components/TestComponents';
import { Modal } from '../components/Modal';
import { SpeakingSection } from '../../../functions/src/utilities/fullTestUtilities';
import { SpeakingBodyComponent } from '../components/SpeakingBodyComponent';

interface SpeakingQuestionsProps {
  speakingSection: SpeakingSection;
  submitAnswers: (answer: any) => void;
}

const SpeakingQuestions: React.FC<SpeakingQuestionsProps> = ({
  speakingSection,
  submitAnswers,
}) => {
  const parts = [speakingSection.P1, speakingSection.P2, speakingSection.P3];

  const [partIndex, setPartIndex] = useState(0);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [answers, setAnswers] = useState('');

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
    <TitleRow title="Speaking Test" onSubmit={() => submitAnswers(answers)} />
  );

  const contentScreen = (
    <div>
      <SpeakingBodyComponent
        speakingPart={parts[partIndex]}
        partIndex={partIndex}
      />
    </div>
  );

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="h-[82svh] lg:h-[80svh] w-screen">{contentScreen}</div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage={'help'}
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};

export default SpeakingQuestions;
