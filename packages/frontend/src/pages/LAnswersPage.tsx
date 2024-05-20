import { useEffect, useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { listeningParts } from '../utilities/LRSampleQuestions';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';

import { QuestionsComponent } from '../components/Reading/QuestionsComponent';
import { useParams } from 'react-router-dom';
import { BsArrowLeft, BsQuestionLg } from 'react-icons/bs';
//import WaveSurferPlayer from '../components/ListeningAudioPlayer';

const LAnswersPage = () => {
  const { sk } = useParams<{
    sk: string | undefined;
  }>();
  const [data, setData] = useState<any>(null);
  const [partIndex, setPartIndex] = useState(0);

  useEffect(() => {
    if (!sk) return;
    console.log(' sk: ', sk);
    toJSON(
      get({
        apiName: 'myAPI',
        path: `/scores/listening/${sk}`,
      }),
    )
      .then(data => {
        setData(data);
        console.log('data: ', data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [sk]);

  if (!data) {
    return (
      <div className="text-lg px-10 text-center mb-8 mt-6">Loading...</div>
    );
  }

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

  const TitleRow = (
    <div className="w-full h-full flex items-center border-b-2">
      <div className="sm:w-1/3 w-1/2 h-full nav-item">
        <button className="hover:text-gray-700">
          <BsArrowLeft className="inline mr-2" />
          <span>Back</span>
        </button>
      </div>
      <div className="w-1/2 sm:w-1/3 text-center font-light text-xl">
        <span>Listening Test Answers</span>
      </div>
    </div>
  );

  /** this will be commented for now, might add it with audio controls if the sponsors wanted to  */
  /* Listening Audio */
  //const audioPlayer = <WaveSurferPlayer urls={urls} height={50} />;

  const questionsScreen = (
    <div className="w-full h-full p-8 overflow-y-scroll">
      <QuestionsComponent
        questions={parts[partIndex].Questions}
        answers={data.studentAnswers[partIndex]}
        setAnswers={data.studentAnswers[partIndex]}
        showCorrectAnswer={true}
      />
    </div>
  );

  return (
    <>
      <div className="h-[6svh] bg-blue-4">{barContent}</div>
      <div className="h-[6svh] lg:h-[8svh]">{TitleRow}</div>
      <div className={`h-[88svh] lg:h-[86svh] w-screen bg-white`}>
        {questionsScreen}
      </div>
      {/*<div className="h-[10svh] p-5 bg-gray-200 flex flex-row items-center">
        {audioPlayer}
  </div>*/}
    </>
  );
};

export default LAnswersPage;
