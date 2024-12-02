import React, { useEffect, useState } from 'react';
import { FullTestItem } from '../../../functions/src/utilities/fullTestUtilities';
import { get } from 'aws-amplify/api';
import { getCachedFeedback, setCachedFeedback, toJSON } from '../utilities';
import { Spinner } from './Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import LAnswersPage from '../pages/LAnswersPage';
import { Layout } from '../Layout';
import RAnswersPage from '../pages/RAnswersPage';
import { WSFeedbackPage } from './WSFeedbackPage';
import { GeneralFulltestFeedbackPage } from '../pages/GeneralFulltestFeedbackPage';

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
      const navigateFunctions = {
        onListeningNavigate: () => setScreen('listening'),
        onReadingNavigate: () => setScreen('reading'),
        onWritingNavigate: () => setScreen('writing'),
        onSpeakingNavigate: () => setScreen('speaking'),
      };

      out = (
        <Layout>
          <GeneralFulltestFeedbackPage
            fullTestItem={data.fullItem}
            {...navigateFunctions}
          />
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
      if (!feedback){
        console.log('Writing Feedback:', data.fullItem?.writingAnswer?.feedback);
        break;}

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

  return out;
};
