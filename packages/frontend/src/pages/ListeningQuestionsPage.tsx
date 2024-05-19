import { useNavigate } from 'react-router-dom';
import { Answer } from '../utilities/LRUtilities';
import { TitleRow } from '../components/TestComponents';
import {
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import { useState } from 'react';
import { toJSON } from '../utilities';
import { post } from 'aws-amplify/api';
import { BsQuestionLg } from 'react-icons/bs';
import { ListeningAudioPlayer } from '../components/ListeningAudioPlayer';
import { ListeningSection } from '../../../functions/src/utilities/fullTestUtilities';

type setType = (arg: Answer[]) => void;

interface ListeningQuestionsPageProps {
  listeningSection: ListeningSection;
}

export const ListeningQuestionsPage: React.FC<ListeningQuestionsPageProps> = ({
  listeningSection,
}) => {
  const navigate = useNavigate();

  const parts = [
    listeningSection.P1,
    listeningSection.P2,
    listeningSection.P3,
    listeningSection.P4,
  ];
  const sk = listeningSection.SK;

  // TODO: don't hard-code urls
  const urls = [
    'https://s3.eu-west-2.amazonaws.com/ielts-web-static/production/Sample-tests/Listening/ielts-listening-sample-task-5-matching.mp3',
    'https://s3.eu-west-2.amazonaws.com/ielts-web-static/production/Sample-tests/Listening/ielts-listening-sample-task-3-short-answer-questions.mp3',
    'https://s3.eu-west-2.amazonaws.com/ielts-web-static/production/Sample-tests/Listening/ielts-listening-sample-task-1-form-completion.mp3',
    'https://s3.eu-west-2.amazonaws.com/ielts-web-static/production/Sample-tests/Listening/ielts-listening-sample-task-8-note-completion.mp3',
  ];

  const [partIndex, setPartIndex] = useState(0);

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

  const submitAnswers = async (sk: string) => {
    try {
      const payload = {
        studentAnswers: answers, // Assuming 'answers' is the nested array data you showed
      };
      const response = await toJSON(
        post({
          apiName: 'myAPI',
          path: `/answers/listening/${sk}`,
          options: {
            headers: {
              'Content-Type': 'application/json',
            },
            body: payload,
          },
        }),
      );
      console.log('Submit response:', response);
      alert('Answers submitted successfully!');
      navigate(`/scores/listening/${sk}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers.');
    }
  };

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

  const titleRow = (
    <TitleRow title="Listening Test" onSubmit={() => submitAnswers(sk)} />
  );

  /* Listening Audio */
  const audioPlayer = <ListeningAudioPlayer urls={urls} />;

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
      <div className={`h-[82svh] lg:h-[80svh] w-screen bg-white`}>
        {questionsScreen}
      </div>
      <div className="h-[6svh] bg-gray-200">{audioPlayer}</div>
    </>
  );
};
