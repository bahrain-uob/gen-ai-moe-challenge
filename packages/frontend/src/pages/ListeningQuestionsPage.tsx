import { useNavigate, useParams } from 'react-router-dom';
import { Answer } from '../utilities/LRUtilities';
import { listeningParts } from '../utilities/LRSampleQuestions';
import { TitleRow } from '../components/TestComponents';
import {
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import { useState } from 'react';
import { toJSON } from '../utilities';
import { post } from 'aws-amplify/api';
import { BsQuestionLg } from 'react-icons/bs';

type setType = (arg: Answer[]) => void;

export const ListeningQuestionsPage = () => {
  const { sk } = useParams();
  if (!sk) return;

  const navigate = useNavigate();

  // TODO: this should be a parameter
  const parts = listeningParts; //listeningParts

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
      <div
        className={`flex fRex-col lg:flex-row
          h-[88svh] lg:h-[86svh] w-screen bg-white`}
      >
        {questionsScreen}
      </div>
    </>
  );
};
