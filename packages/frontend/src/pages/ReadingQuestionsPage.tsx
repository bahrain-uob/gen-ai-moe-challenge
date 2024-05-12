import React, { useState } from 'react';
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

  const x = parts.map((part, index) => (
    <React.Fragment key={index}>
      <PassageComponent readingPart={part} PartIndex={1} />
      <QuestionsComponent
        questions={part.Questions}
        answers={answers[index]}
        setAnswers={indexSet(index)}
      />
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
  ));

  return x;
};

export default ReadingQuestions;
