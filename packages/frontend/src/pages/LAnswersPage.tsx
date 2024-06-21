import { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { listeningParts } from '../utilities/LRSampleQuestions';

import { QuestionsComponent } from '../components/Reading/QuestionsComponent';
import { BsQuestionLg } from 'react-icons/bs';
import { TitleRow } from '../components/TestComponents';

type LAnswersPageProps = {
  studentAnswers: any;
  onBack: () => void;
};

const LAnswersPage: React.FC<LAnswersPageProps> = ({
  studentAnswers,
  onBack,
}) => {
  const [partIndex, setPartIndex] = useState(0);

  // TODO: this should be a parameter
  const parts = listeningParts;

  /*const urls = [
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg',
  ];*/

  /* Bar */
  const linkStyling =
    'px-3 lg:px-5 transition -colors duration-200 flex items-center leading-normal ';
  const barContent = (
    <div className="flex flex-1 h-full font-montserrat text-sm font-bold text-white">
      <span className={linkStyling + ' hover-darken'}>
        <span>Help</span>
        <BsQuestionLg className="inline ml-2" size={16} />
      </span>
      <span className={linkStyling + ' mr-auto'}></span>
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

  const titleRow = <TitleRow title="Listening Answers" onBack={onBack} />;

  /** this will be commented for now, might add it with audio controls if the sponsors wanted to  */
  /* Listening Audio */
  //const audioPlayer = <WaveSurferPlayer urls={urls} height={50} />;

  const questionsScreen = (
    <div className="w-full h-full p-8 overflow-y-scroll">
      <QuestionsComponent
        questions={parts[partIndex].Questions}
        answers={studentAnswers[partIndex]}
        setAnswers={() => {}}
        showCorrectAnswer={true}
      />
    </div>
  );

  return (
    <>
      <div className="h-[6dvh] bg-blue-4">{barContent}</div>
      <div className="h-[6dvh] lg:h-[8dvh]">{titleRow}</div>
      <div className={`h-[88dvh] lg:h-[86dvh] w-screen bg-white`}>
        {questionsScreen}
      </div>
      {/*<div className="h-[10dvh] p-5 bg-gray-200 flex flex-row items-center">
        {audioPlayer}
  </div>*/}
    </>
  );
};

export default LAnswersPage;
