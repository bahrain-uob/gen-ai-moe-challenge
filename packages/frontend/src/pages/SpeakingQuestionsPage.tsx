import { useEffect, useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { TitleRow } from '../components/TestComponents';
import { Modal } from '../components/Modal';
import { SpeakingSection } from '../../../functions/src/utilities/fullTestUtilities';
import { SpeakingBodyComponent } from '../components/SpeakingBodyComponent';
import { MicButton } from '../components/MicButton';
import { useMicRecorder } from '../components/useMicRecorder';
import {
  generateFileName,
  submitAudioFile,
} from '../utilities/speakingUtilities';

interface SpeakingQuestionsProps {
  speakingSection: SpeakingSection;
  submitAnswers: (answer: any) => void;
}

interface AnswersInterface {
  P1: {
    audioFileNames: string[];
    questions: string[];
  };
  P2: {
    audioFileName: string;
    question: string;
  };
  P3: {
    audioFileNames: string[];
    questions: string[];
  };
}

const SpeakingQuestions: React.FC<SpeakingQuestionsProps> = ({
  speakingSection,
  submitAnswers,
}) => {
  const parts = [speakingSection.P1, speakingSection.P2, speakingSection.P3];
  const [partIndex, setPartIndex] = useState(0);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [response, setResponse] = useState<string[]>([]);

  const { isRecording, startRecording, stopRecording, audioBlob } =
    useMicRecorder();

  useEffect(() => {
    if (audioBlob) {
      const responseFile = generateFileName();
      submitAudioFile(responseFile, audioBlob);
      response.push(responseFile);
      setResponse(response);
    }
  }, [audioBlob]);

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
    <TitleRow
      title="Speaking Test"
      onSubmit={() => {
        const P1Questions = parts[0].Questions.map(question => question.text);
        const P2Question = parts[1].Questions.join('\n');
        const P3Questions = parts[2].Questions.map(question => question.text);

        const stuAnswers: AnswersInterface = {
          P1: {
            audioFileNames: response.slice(0, P1Questions.length),
            questions: P1Questions,
          },
          P2: {
            audioFileName: response[P1Questions.length],
            question: P2Question,
          },
          P3: {
            audioFileNames: response.slice(P1Questions.length + 1),
            questions: P3Questions,
          },
        };
        submitAnswers(stuAnswers);
      }}
    />
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
      <div className="flex flex-col h-full justify-evenly items-center px-6">
        <div className="h-[82svh] lg:h-[80svh] w-screen">{contentScreen}</div>
        <MicButton
          className="shadow-backdrop"
          onStop={stopRecording}
          onStart={startRecording}
          isRecording={isRecording}
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

export default SpeakingQuestions;
