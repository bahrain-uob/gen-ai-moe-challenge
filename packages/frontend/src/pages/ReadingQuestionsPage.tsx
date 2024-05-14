import React, { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { readingParts } from '../utilities/readingUtilities';
import { PassageComponent } from '../components/Reading/PassageComponent';
import ReadingHeader from '../components/Reading/ReadingHeader';
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

  const [activePartIndex, setActivePartIndex] = useState<number>(0);

  //Parts Button
  const buttons = parts.map((part, index) => (
    <button
      key={index}
      className={`p-2 text-white bg-blue-4 hover:bg-white text-blue-4  py-1 px-5  rounded-full ${
        activePartIndex === index ? 'text-blue-4 ' : ''
      }`}
      onClick={() => setActivePartIndex(index)}
    >
      Part {index + 1}
    </button>
  ));

  const x = (
    <React.Fragment>

     
        <ReadingHeader duration={60} section='Reading Test' />
  

      <div className="flex flex-wrap justify-center space-x-2 m-10">
        {buttons}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-10 max-w-7xl mx-auto">
        
        <div className="w-full md:w-1/2 h-screen p-4  overflow-auto">
          <PassageComponent
            readingPart={parts[activePartIndex]}
            PartIndex={1}
          />
        </div>
        <div className="w-full md:w-1/2 h-screen bg-white p-4  shadow-md rounded overflow-auto">
          <QuestionsComponent
            questions={parts[activePartIndex].Questions}
            answers={answers[activePartIndex]}
            setAnswers={indexSet(activePartIndex)}
          />

        </div>

      </div>

      <div className="text-center">
            <button
              type="submit"
              className="bg-white text-blue-4 px-12 py-1 rounded-full shadow-md mt-10 select-none"
            >
              Submit
            </button>
          </div>
      <ul>
        {answers.map((a1, i) => (
          <li key={i} className="ml-2">
            {i + 1}-
            <ul>
              {a1.map((a2, j) => (
                <li key={j} className="ml-2">
                  {j + 1}- {JSON.stringify(a2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );

  return x;
};

export default ReadingQuestions;
