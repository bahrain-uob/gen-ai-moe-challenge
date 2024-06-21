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
import {
  generateFileName,
  submitAudioFile,
} from '../utilities/speakingUtilities';

type SpeakingBodyComponentProps = {
  speakingPart: SpeakingPartAudio | SpeakingPartCard;
  answer: SpeakingAudioAnswer | SpeakingCardAnswer;
  setAnswer: (arg: SpeakingAudioAnswer | SpeakingCardAnswer) => void;
  onNextPart: () => void;
};

/**
 * This Comopnent handles the body of the speaking page.
 */
export const SpeakingBodyComponent: React.FC<SpeakingBodyComponentProps> = ({
  speakingPart,
  answer,
  setAnswer,
  onNextPart,
}) => {
  const { isRecording, startRecording, stopRecording } = useMicRecorder({
    onStopRecording: blob => {
      // const url = URL.createObjectURL(blob);
      // const x = new Audio(url);
      // x.play();
      // console.log({ blob, url });

      const fileName = generateFileName();
      submitAudioFile(fileName, blob).then(() => {
        if (isCardPart(speakingPart)) {
          setAnswer({
            audioFileName: fileName,
            question: 'What is this?',
          });
        } else {
          if ('audioFileNames' in answer) {
            const answerCopy: SpeakingAudioAnswer = {
              audioFileNames: [...answer.audioFileNames, fileName],
              questions: [
                ...answer.questions,
                Math.random().toString(36).substring(2, 7),
              ],
            };
            setAnswer(answerCopy);
          } else {
            setAnswer({
              audioFileNames: [fileName],
              questions: ['What is this?'],
            });
          }
        }
      });
    },
  });

  /** Handles the current index (used to match between questions and recordings). */
  const [questionIndex, setQuestionIndex] = useState(0);
  /** Used to disable mic recording button, until the audio is played. */
  const [allowRecording, setAllowRecording] = useState(
    isCardPart(speakingPart),
  );
  const length = isCardPart(speakingPart) ? 1 : speakingPart.Questions.length;

  console.log({ answer });

  const toNextRecording = () => {
    stopRecording();
    setQuestionIndex(i => {
      setAllowRecording(false);
      if (i < length - 1) {
        return i + 1;
      } else {
        onNextPart();
        return i;
      }
    });
  };

  const handleAudioFinish = () => {
    // Note: if the user records answer for last question and plays audio again,
    // he is allowed to record another *additional* answer.  This shouldn't be
    // an issue if (A) the user is switched to the next part once he records an
    // answer, (B) we disable playing the question again, or (C) we check the
    // answer length.  For now, solution (A) is easier to implement, though
    // solution (C) seems to be the better one.
    setAllowRecording(true);
    console.log(questionIndex);
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
