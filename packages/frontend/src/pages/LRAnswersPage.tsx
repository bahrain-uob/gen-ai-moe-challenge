import React, { useEffect, useState } from 'react';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import { readingParts } from '../utilities/LRSampleQuestions';
//import { listeningParts } from '../utilities/LRSampleQuestions';
import { PassageComponent } from '../components/Reading/PassageComponent';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';

import { QuestionsComponent } from '../components/Reading/QuestionsComponent';
import { useParams } from 'react-router-dom';

const LRAnswersPage = () => {
  const { section, sk } = useParams<{
    section: string | undefined;
    sk: string | undefined;
  }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!section || !sk) return;

    toJSON(
      get({
        apiName: 'myAPI',
        path: `/scores/${section}/${sk}`,
      }),
    )
      .then(data => {
        setData(data);
        console.log('data: ', data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [section, sk]);

  if (!data) {
    return (
      <div className="text-lg px-10 text-center mb-8 mt-6">Loading...</div>
    );
  }

  // TODO: this should be a parameter
  const parts = readingParts;

  const x = parts.map((part, index) => (
    <React.Fragment key={index}>
      {/* comment the line below for listening */}
      <PassageComponent readingPart={part} PartIndex={1} />
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

export default LRAnswersPage;
