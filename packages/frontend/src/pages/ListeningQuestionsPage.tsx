import { Answer } from '../utilities/LRUtilities';
import { TitleRow } from '../components/TestComponents';
import {
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs';
import { ListeningSection } from '../../../functions/src/utilities/fullTestUtilities';
import { Modal } from '../components/Modal';
import WaveSurferPlayer from '../components/ListeningAudioPlayer';

type setType = (arg: Answer[]) => void;

interface ListeningQuestionsPageProps {
  listeningSection: ListeningSection;
  submitAnswers: (answer: any) => void;
}

export const ListeningQuestionsPage: React.FC<ListeningQuestionsPageProps> = ({
  listeningSection,
  submitAnswers,
}) => {
  const parts = [
    listeningSection.P1,
    listeningSection.P2,
    listeningSection.P3,
    listeningSection.P4,
  ];

  // TODO: don't hard-code urls
  const urls = [
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
  ];

  const [partIndex, setPartIndex] = useState(0);
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
    <TitleRow title="Listening Test" onSubmit={() => submitAnswers(answers)} />
  );

  /* Listening Audio */
  const audioPlayer = <WaveSurferPlayer urls={urls} height={50} />;

  const questionsScreen = (
    <div className="w-full h-full p-8 overflow-y-scroll">
      <QuestionsComponent
        questions={parts[partIndex].Questions}
        answers={answers[partIndex]}
        setAnswers={indexSet(partIndex)}
        showCorrectAnswer={false}
      />
    </div>
  );

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{titleRow}</div>
      <div className={`h-[78svh] lg:h-[76svh] w-screen bg-white`}>
        {questionsScreen}
      </div>
      <div className="h-[10svh] p-5 bg-gray-200 flex flex-row items-center">
        {audioPlayer}
      </div>
      <Modal
        isOpen={helpIsOpen}
        modalMessage="This is help"
        onCancel={() => setHelpIsOpen(false)}
      />
    </>
  );
};
