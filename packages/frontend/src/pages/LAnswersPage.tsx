import React, { useEffect, useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { listeningParts } from '../utilities/LRSampleQuestions';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';

import { QuestionsComponent } from '../components/Reading/QuestionsComponent';
import { useParams } from 'react-router-dom';

const LAnswersPage = () => {
  const { sk } = useParams<{
    sk: string | undefined;
  }>();
  const [data, setData] = useState<any>(null);

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

  const x = parts.map((part, index) => (
    <React.Fragment key={index}>
      <QuestionsComponent
        questions={part.Questions}
        answers={data.studentAnswers[index]}
        setAnswers={data.studentAnswers[index]}
        showCorrectAnswer={true}
      />
    </React.Fragment>
  ));

  return x;
};

export default LAnswersPage;
