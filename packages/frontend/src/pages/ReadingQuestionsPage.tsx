import { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { readingParts } from '../utilities/readingUtilities';
import { PassageComponent } from '../components/Reading/PassageComponent';
import {
  Answer,
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';

type setType = (arg: Answer[]) => void;

const ReadingQuestions = () => {
  // const { section, sk } = useParams();

  // TODO: this should be a parameter
  const parts = readingParts;

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

  const containerStyles =
    'h-[46vh] w-screen lg:w-1/2 lg:h-[92vh] p-10 overflow-y-scroll';
  const linkStyling =
    'px-5 hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex items-center leading-normal ';

  return (
    <>
      <div className="h-[6vh] bg-blue-4"></div>
      <div className="flex flex-col lg:flex-row">
        <div className={containerStyles}>
          <PassageComponent readingPart={parts[0]} PartIndex={1} />
        </div>
        <div className={containerStyles + ' bg-white rounded-3xl'}>
          <QuestionsComponent
            questions={parts[0].Questions}
            answers={answers[0]}
            setAnswers={indexSet(0)}
          />
        </div>
      </div>
    </>
  );
};

export default ReadingQuestions;
