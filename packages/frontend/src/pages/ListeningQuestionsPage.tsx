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
import  WaveSurferPlayerProps  from '../components/ListeningAudioPlayer';

type setType = (arg: Answer[]) => void;

export const ListeningQuestionsPage = () => {
  const { sk } = useParams();
  if (!sk) return;

  const navigate = useNavigate();

  // TODO: this should be a parameter
  const parts = listeningParts; //listeningParts
  const urls = [
    "https://prod-codecatalyst-sst-app-dbst-pollybucket368908e5-ftpqzamr2lpy.s3.amazonaws.com/bf180405-52f0-489a-9f9e-e2c62ad075c9.mp3?AWSAccessKeyId=ASIA47CRUO22TP66VNBR&Signature=nZ4y%2FahJZoMnBi%2BnaenqHagoEvM%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIB4%2FVpS3z1Nnhw2dZwuoZuZj1zU8SWjd9Y%2FhcQU73HUpAiA9ZqOEeqaWNkfiQNI8fs%2BrPVw%2BAkdrxEl8fMPTOVTrkircAwj2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg5MTM3NjkyNDM0MSIMmJVNOEHQwxV%2BBmh2KrADvoHnZA3WTDqcmYE9tCJ6BCQkTQPcB0KnrO13ndzQdzlHAHinO3StLx4Ua6oTQznAem08VI4nCVtcf2eQwwH0SVDG9W%2B%2BP%2F3QuyQS9y1GLf6zrh3l5SToAbYfTPDIGUZtXfEAnfkZCi8f%2FRSyNqPKG0vETLgMm25hxnTVJZvHSuxoj6%2FlH9MW9i4HRdrVzHg69ADiS7ShzTqGAXyXL4JIXiLwvZ5ShPHRKWHKKmk%2FgLIjuAlHgcm%2BdOHzcUPsOwBlnoxrMsgCKijDJVt3xd0kjv2uyMRbPC6RhUKc0Br5wlWlMV4u%2FHaUoxDLTw%2B%2BXRpsIByNyzuFTaelysS6WonG1N0sxBl85mHC6VAFRwbyMMueunk98D7lFuPZp3RD5c6qA3TYgX17RUJqN3jyLAwywmMtS40xLUSX11KKi5tBudPokCnJ38cSUq6UTMNI3m1tcVB5MTjJ9foJ1I%2Bw%2FCi%2FQOFCTzMOowLjULLox%2B2ce5kkDdjbL%2FbhG0QrrJTulxsbLe2qmiZQxJ9lqC1VXXNDE0QM504IZKXsnxkElcTt4LNFOeZqRQISi9T97%2Fm7uVS%2BMK6npLIGOp8BHV9hKCtT%2B%2BnDDXaHIfMYdr4M0dqIdeLekQSYGuux04ljY9M38sQI9Ye6RfOehKFjjyY4MFukhNzdQhH0JxGiQgNfDcAWMBymKJeKobiKLzjevkyQUEcX%2Fs0Zu%2FR20%2B2vxTm49d1Uwu7IwwJPzfsnOtR4%2F7JSUOVCOU4C%2BGywz3e5u2YKRw40v9yGAF6w6dw33Fe1l1YLegp7HoHQoQ4I&Expires=1716065889",
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
  const audioPlayer = <WaveSurferPlayerProps urls={urls} />;

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
