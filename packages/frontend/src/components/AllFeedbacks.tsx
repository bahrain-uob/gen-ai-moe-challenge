import React, { useEffect, useState } from 'react';
import { FullTestItem } from '../../../functions/src/utilities/fullTestUtilities';
import { Button } from './Button';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import { Spinner } from './Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { WSFeedbackComponent } from './WSFeedback';

type Screens = 'general' | 'listening' | 'reading' | 'writing' | 'speaking';
type DataType = { fullItem: FullTestItem } | undefined | { message: string };

export const AllFeedbacks: React.FC = () => {
  let out;

  const [data, setData] = useState<DataType>();
  const [screen, setScreen] = useState<Screens>('general');

  // Get full test item
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

  if (!data) {
    return <Spinner message={'Loading your feedback'} />;
  }

  if ('message' in data) {
    // TODO: error page
    return `Recieved error: ${data.message}`;
  }

  console.log({ data });

  // Handle various pages
  switch (screen) {
    case 'general':
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
      {screen !== 'general' && (
        <div className="mt-20">
          <Button onClick={() => setScreen('general')}>Back</Button>
        </div>
      )}
    </>
  );
};
