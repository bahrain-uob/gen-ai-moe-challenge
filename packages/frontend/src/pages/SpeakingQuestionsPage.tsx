import { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { TitleRow } from '../components/TestComponents';
import { Modal } from '../components/Modal';
import {
  SpeakingAnswer,
  SpeakingAudioAnswer,
  SpeakingCardAnswer,
  SpeakingSection,
} from '../../../functions/src/utilities/fullTestUtilities';
import { SpeakingBodyComponent } from '../components/SpeakingBodyComponent';

interface SpeakingQuestionsPageProps {
  speakingSection: SpeakingSection;
  submitAnswers: (answer: any) => void;
}

type AnswersInterface = NonNullable<SpeakingAnswer['answer']>;

type SpeakingPartIndex = 'P1' | 'P2' | 'P3';

export const SpeakingQuestionsPage: React.FC<SpeakingQuestionsPageProps> = ({
  speakingSection,
  submitAnswers,
}) => {
  const [partIndex, setPartIndex] = useState<SpeakingPartIndex>('P1');
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [response, setResponse] = useState<AnswersInterface>({
    P1: {
      audioFileNames: [],
      questions: [],
    },
    P2: {
      audioFileName: '',
      question: '',
    },
    P3: {
      audioFileNames: [],
      questions: [],
    },
  });

  const updateResponseAtIndex = (
    index: SpeakingPartIndex,
    answer: SpeakingAudioAnswer | SpeakingCardAnswer,
  ) => {
    const responseCopy = { ...response };
    responseCopy[index] = answer as SpeakingAudioAnswer & SpeakingCardAnswer;
    setResponse(responseCopy);
  };

  const onNextPart = () => {
    switch (partIndex) {
      case 'P1':
        setPartIndex('P2');
        break;
      case 'P2':
        setPartIndex('P3');
        break;
      case 'P3':
        console.log('Submitting answer', { response });
        submitAnswers(response);
        break;
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
      {['P1', 'P2', 'P3'].map((part, i) => (
        <button
          className={
            linkStyling +
            (part === partIndex ? 'bg-black bg-opacity-40' : 'hover-darken')
          }
          // TODO: disable switching between the parts
          onClick={() => setPartIndex(part as SpeakingPartIndex)}
          key={i}
        >
          Part {i + 1}
        </button>
      ))}
    </div>
  );

  const titleRow = <TitleRow title="Speaking Test" onSubmit={() => {}} />;

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="h-[82svh] lg:h-[80svh] w-screen">
        <SpeakingBodyComponent
          key={`speaking-part-${partIndex}`}
          speakingPart={speakingSection[partIndex]}
          answer={response[partIndex]}
          setAnswer={answer => updateResponseAtIndex(partIndex, answer)}
          onNextPart={onNextPart}
        />
      </div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage={'help'}
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};
