import { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { TitleRow } from '../components/TestComponents';
import { Modal } from '../components/Modal';
import {
  SpeakingAnswer,
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

  // useEffect(() => {
  //   if (audioBlob) {
  //     const responseFile = generateFileName();
  //     submitAudioFile(responseFile, audioBlob);
  //     response.push(responseFile);
  //     setResponse(response);
  //   }
  // }, [audioBlob]);

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
          onClick={() => setPartIndex(part as SpeakingPartIndex)}
          key={i}
        >
          Part {i + 1}
        </button>
      ))}
    </div>
  );

  const titleRow = (
    <TitleRow
      title="Speaking Test"
      onSubmit={
        () => {}
        //   () => {
        //   const P1Questions = parts[0].Questions.map(question => question.text);
        //   const P2Question = parts[1].Questions.join('\n');
        //   const P3Questions = parts[2].Questions.map(question => question.text);
        //   const stuAnswers: AnswersInterface = {
        //     P1: {
        //       audioFileNames: response.slice(0, P1Questions.length),
        //       questions: P1Questions,
        //     },
        //     P2: {
        //       audioFileName: response[P1Questions.length],
        //       question: P2Question,
        //     },
        //     P3: {
        //       audioFileNames: response.slice(P1Questions.length + 1),
        //       questions: P3Questions,
        //     },
        //   };
        //   submitAnswers(stuAnswers);
        // }
      }
    />
  );

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className="h-[82svh] lg:h-[80svh] w-screen">
        <SpeakingBodyComponent
          key={`speaking-part-${partIndex}`}
          speakingPart={speakingSection[partIndex]}
          answer={response[partIndex]}
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
