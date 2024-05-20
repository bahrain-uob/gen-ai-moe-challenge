import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { ConfirmFullTestStart } from '../components/ConfirmFullTestStart';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSocketUrl } from '../utilities';
import { useState } from 'react';
import { ListeningQuestionsPage } from './ListeningQuestionsPage';
import ReadingQuestions from './ReadingQuestionsPage';

export const FullTestPage = () => {
  let out;
  const [state, setState] = useState<any>(null);
  const { testId } = useParams();
  const [isLoading, setIsloading] = useState(false);

  const socketUrl = useSocketUrl() ?? '';
  const navigate = useNavigate();
  console.log({ state, testId });

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: event => console.log('opened', event),
    onClose: event => console.log('closed', event),
    onMessage: e => {
      console.log('event', e);
      const response = JSON.parse(e.data);
      console.log('message', response);
      if ('testID' in response) {
        setState(response);
        navigate(`/full-test/${response.testID}`);
      } else if ('data' in response) {
        console.log('Recieved data');
        setState(response);
      }
    },
    shouldReconnect: () => true,
  });

  if (readyState !== ReadyState.OPEN)
    return (
      <Layout>
        <p>
          {socketUrl === ''
            ? 'You have to sign in first'
            : connectionStatus[readyState]}
        </p>
      </Layout>
    );

  // Test was not started
  if (!testId) {
    const startTest = () => {
      sendJsonMessage({ action: 'fullTestStart' });
    };

    out = (
      <Layout>
        <ConfirmFullTestStart onConfirm={() => startTest()} />
      </Layout>
    );
  } else {
    if (!state) {
      if (!isLoading) {
        sendJsonMessage({
          action: 'fullTestGetQuestion',
          testId: testId,
        });
        console.log('Sent message');
        setIsloading(true);
      }

      out = 'Loading...';
    }

    // Test was started
    else {
      console.log('executed w/', state.data.question);
      switch (state.type) {
        case 'listening':
          console.log('executed w/', state.data.question);
          const submitAnswers = (answers: any) => {
            sendJsonMessage({
              action: 'fullTestSubmit',
              testId: testId,
              data: {
                type: state.type, // listening, reading, writing, speaking
                answer: answers, // this will be based on the section answer schema
              },
            });
          };

          out = (
            <ListeningQuestionsPage
              listeningSection={state.data.question}
              submitAnswers={submitAnswers}
            />
          );
          break;

        case 'reading':
          out = <ReadingQuestions readingSection={state.data.question} />;
          break;
      }
    }
  }

  return out;
};

const connectionStatus = {
  [ReadyState.CONNECTING]: "We're trying to connect to the server...",
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]:
    'Failed to connect to the server.  Please try again later',
  [ReadyState.CLOSED]:
    'Failed to connect to the server.  Please try again later',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};
