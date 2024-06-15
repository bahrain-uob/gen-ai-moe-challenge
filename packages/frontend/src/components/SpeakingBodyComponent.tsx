import { useState } from 'react';
import {
  SpeakingAudioAnswer,
  SpeakingCardAnswer,
  SpeakingPartAudio,
  SpeakingPartCard,
} from '../../../functions/src/utilities/fullTestUtilities';
import { MicButton } from './MicButton';
import { useMicRecorder } from './useMicRecorder';
import { SpeakingAudioPlayer } from './SpeakingAudioPlayer';

// type SpeakingPart = {
//   Task: {
//     S3key: string;
//     text: number;
//   };
//   Questions: {
//     text: string;
//     S3Key?: string;
//   }[];
// };

type SpeakingBodyComponentProps = {
  speakingPart: SpeakingPartAudio | SpeakingPartCard;
  answer: SpeakingAudioAnswer | SpeakingCardAnswer;
  setAnswer: (arg: SpeakingAudioAnswer | SpeakingCardAnswer) => void;
};

// type SpeakingBodyComponentProps =
//   | {
//       speakingPart: SpeakingPartCard;
//       answer: SpeakingCardAnswer;
//     }
//   | {
//       speakingPart: SpeakingPartAudio;
//       answer: SpeakingAudioAnswer;
//     };

/**
 * This Comopnent handles the body of the speaking page.
 */
export const SpeakingBodyComponent: React.FC<SpeakingBodyComponentProps> = ({
  speakingPart,
  answer,
  setAnswer,
}) =>
  //speakingPart: SpeakingPart;
  //partIndex: number;
  //}
  {
    const { isRecording, startRecording, stopRecording, audioBlob } =
      useMicRecorder();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [allowRecording, setAllowRecording] = useState(false);

    console.log({ answer });

    const toNextRecording = () => {
      stopRecording();
      setQuestionIndex(i => {
        setAllowRecording(false);
        if (i < speakingPart.Questions.length - 1) {
          return i + 1;
        } else {
          // TODO: handle finished
          return i;
        }
      });
    };

    const handleAudioFinish = () => {
      setQuestionIndex(i => {
        if (i < speakingPart.Questions.length - 1) {
          setAllowRecording(true);
        }
        return i;
      });
    };

    let view;
    if (isCardPart(speakingPart)) {
      view = <SpeakingCardComponent part={speakingPart} />;
    } else {
      view = (
        <SpeakingAudioPlayer
          trackIndex={questionIndex}
          url={speakingPart.Questions[questionIndex].S3key}
          height={200}
          onFinish={handleAudioFinish}
        />
      );
    }

    return (
      <div className="flex flex-col h-full justify-evenly items-center px-6">
        {view}
        <MicButton
          className="shadow-backdrop"
          onStop={toNextRecording}
          onStart={startRecording}
          isRecording={isRecording}
          disabled={!allowRecording}
        />
      </div>
    );
  };

const SpeakingCardComponent = ({ part }: { part: SpeakingPartCard }) => {
  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-backdrop py-4 px-6">
      <h3 className="font-light text-lg mb-3 border-b-2">{part.Task.text}</h3>
      <ul className="list-inside ml-4">
        {part.Questions.map((question, index) => (
          <li key={index} className="list-disc mb-1">
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

const isCardPart = (
  speakingPart: SpeakingPartAudio | SpeakingPartCard,
): speakingPart is SpeakingPartCard => {
  return typeof speakingPart.Questions[0] === 'string';
};
