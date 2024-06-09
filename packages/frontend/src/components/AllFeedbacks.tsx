import React, { useEffect, useState } from 'react';
import { FullTestItem } from '../../../functions/src/utilities/fullTestUtilities';
import { Button } from './Button';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import { Spinner } from './Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { WSFeedbackComponent } from './WSFeedback';

type Screens = 'feedback' | 'listening' | 'reading' | 'writing' | 'speaking';
type DataType = { fullItem: FullTestItem } | undefined | { message: string };

export const AllFeedbacks: React.FC = () => {
  const [data, setData] = useState<DataType>();
  const [screen, setScreen] = useState<Screens>('feedback');

  const { sk } = useParams();
  const navigate = useNavigate();
  if (!sk) {
    navigate(-1);
  }

  useEffect(() => {
    console.log(`/fullTestFeedback/${sk}`);
    toJSON(
      get({
        apiName: 'myAPI',
        path: `/fullTestFeedback/${sk}`,
      }),
    )
      .then(response => setData(response))
      .catch(err => {
        if ('message' in err) {
          setData(err);
        } else {
          throw err;
        }
      });
  }, []);

  let out;

  if (!data) {
    return <Spinner message={'Loading your feedback'} />;
  }
  // return JSON.stringify(fullTestItem);

  if ('message' in data) {
    return `Recieved error: ${data.message}`;
  }

  switch (screen) {
    case 'feedback':
      const readingFeedback = data.fullItem.readingAnswer?.feedback;
      const readingScores =
        readingFeedback && 'scores' in readingFeedback
          ? readingFeedback.totalScore
          : null;

      out = (
        <div>
          <h3 className="text-lg font-light">Feedback</h3>
          <div>
            <p>Reading score: {JSON.stringify(readingScores)}</p>
            <div className="mt-4"></div>
            <Button onClick={() => setScreen('listening')}>
              Listening Feedback
            </Button>
            <Button onClick={() => setScreen('reading')}>
              Reading Feedback
            </Button>
            <Button onClick={() => setScreen('writing')}>
              Writing Feedback
            </Button>
            <Button onClick={() => setScreen('speaking')}>
              Speaking Feedback
            </Button>
          </div>
        </div>
      );
      break;

    case 'listening':
      out = 'Listening';
      break;

    case 'reading':
      out = 'reading';
      break;

    case 'writing':
      const feedback = data.fullItem?.writingAnswer?.feedback;
      if (!feedback) break;
      out = feedback.map((taskFeedback, key) => (
        <WSFeedbackComponent feedback={taskFeedback} key={key} />
      ));
      break;

    case 'speaking':
      break;
  }

  return (
    <>
      {out}
      {screen !== 'feedback' && (
        <div className="mt-20">
          <Button onClick={() => setScreen('feedback')}>Back</Button>
        </div>
      )}
    </>
  );
};
