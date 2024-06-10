import React, { useEffect, useState } from 'react';
import { FullTestItem } from '../../../functions/src/utilities/fullTestUtilities';
import { Button } from './Button';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import { Spinner } from './Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import LAnswersPage from '../pages/LAnswersPage';
import { Layout } from '../Layout';
import RAnswersPage from '../pages/RAnswersPage';
import { WSFeedbackPage } from './WSFeedbackPage';

type Screens = 'general' | 'listening' | 'reading' | 'writing' | 'speaking';
type DataType = { fullItem: FullTestItem } | undefined | { message: string };

export const AllFeedbacks: React.FC = () => {
  let out;

  const [data, setData] = useState<DataType>();
  const [screen, setScreen] = useState<Screens>('general');

  // Get full test item
  const { testId } = useParams();
  const navigate = useNavigate();
  if (!testId) {
    navigate(-1);
  }
  useEffect(() => {
    console.log(`/fullTestFeedback/${testId}`);

    // Local was found
    try {
      let localData = getCachedFeedback(testId as string);
      if (localData) {
        setData(localData);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    // Corrupt or no local data was found
    toJSON(
      get({
        apiName: 'myAPI',
        path: `/fullTestFeedback/${testId}`,
      }),
    )
      .then(response => {
        setData(response);
        setCachedFeedback(response, testId as string);
      })
      .catch(err => {
        if ('message' in err) {
          setData(err);
        } else {
          throw err;
        }
      });
  }, []);

  if (!data) {
    return (
      <Layout>
        <Spinner message={'Loading your feedback'} />
      </Layout>
    );
  }

  if ('message' in data) {
    // TODO: error page
    return <Layout>{`Recieved error: ${data.message}`}</Layout>;
  }

  console.log({ data });

  // Handle various pages
  const listeningFeedback = data.fullItem?.listeningAnswer?.feedback;
  const readingFeedback = data.fullItem.readingAnswer?.feedback;
  const readingSection = data.fullItem.questions.reading;

  switch (screen) {
    case 'general':
      const readingScores =
        readingFeedback && !('error' in readingFeedback)
          ? readingFeedback.totalScore
          : null;

      out = (
        <Layout>
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
        </Layout>
      );
      break;

    case 'listening':
      if (listeningFeedback && !('error' in listeningFeedback)) {
        console.log(listeningFeedback.studentAnswers);
        out = (
          <LAnswersPage
            studentAnswers={listeningFeedback.studentAnswers}
            onBack={() => setScreen('general')}
          />
        );
      } else {
        out = <Layout>{`Listening error: ${listeningFeedback?.error}`}</Layout>;
      }
      break;

    case 'reading':
      if (readingFeedback && !('error' in readingFeedback)) {
        console.log(readingFeedback.studentAnswers);
        out = (
          <RAnswersPage
            readingParts={[
              readingSection.P1,
              readingSection.P2,
              readingSection.P3,
            ]}
            studentAnswers={readingFeedback.studentAnswers}
            onBack={() => setScreen('general')}
          />
        );
      } else {
        out = <Layout>{`Listening error: ${readingFeedback?.error}`}</Layout>;
      }
      break;

    case 'writing':
    case 'speaking':
      const feedback =
        screen === 'writing'
          ? data.fullItem?.writingAnswer?.feedback
          : data.fullItem?.speakingAnswer?.feedback;
      if (!feedback) break;

      out = (
        <Layout>
          <WSFeedbackPage
            feedback={feedback}
            onBack={() => setScreen('general')}
          />
        </Layout>
      );

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

const getFeedbackKey = (testId: string) => `FeedbackItem-${testId}`;

const getCachedFeedback = (testId: string) => {
  const localData = sessionStorage.getItem(getFeedbackKey(testId));
  if (localData) console.log('Using cached', { localData });
  return localData ? JSON.parse(localData) : localData;
};

export const setCachedFeedback = (feedback: any, testId: string) => {
  sessionStorage.setItem(getFeedbackKey(testId), JSON.stringify(feedback));
};
