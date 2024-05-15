import React, { useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { Answer } from '../utilities/LRUtilities';
import { readingParts } from '../utilities/LRSampleQuestions';
import { PassageComponent } from '../components/Reading/PassageComponent';
import { post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import {
  QuestionsComponent,
  initialAnswer,
} from '../components/Reading/QuestionsComponent';
import { useParams, useNavigate } from 'react-router-dom';

type setType = (arg: Answer[]) => void;

const ReadingQuestions = () => {
  const { sk } = useParams();
  if (!sk) return;

  const navigate = useNavigate();

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

  const submitAnswers = async (sk: string) => {
    try {
      const payload = {
        studentAnswers: answers, // Assuming 'answers' is the nested array data you showed
      };
      const response = await toJSON(
        post({
          apiName: 'myAPI',
          path: `/answers/reading/${sk}`,
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
      navigate(`/scores/reading/${sk}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers.');
    }
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
      <button onClick={() => submitAnswers(sk)}>Submit Answers</button>
    </React.Fragment>
  ));

  return x;
};

export default ReadingQuestions;
