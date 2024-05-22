import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { ConfirmFullTestStart } from '../components/ConfirmFullTestStart';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSocketUrl } from '../utilities';
import { useState } from 'react';
import { ListeningQuestionsPage } from './ListeningQuestionsPage';
import ReadingQuestions from './ReadingQuestionsPage';
import { Spinner } from '../components/Spinner';
import { WritingPage } from './WritingPage';
import { IntermediatePage } from '../components/IntermediatePage';
import { ToastContainer, toast } from 'react-toastify';

export const FullTestPage = () => {
  let out;
  const [state, setState] = useState<any>(null);
  const { testId } = useParams();
  const [isLoading, setIsloading] = useState(false);

  const socketUrl = useSocketUrl() ?? '';
  const navigate = useNavigate();
  console.log('State', { state, testId });

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: event => console.log('opened', event),
    onClose: event => console.log('closed', event),
    ////// Handle incoming messages //////
    onMessage: e => {
      console.log('event', e);
      const response = JSON.parse(e.data);
      console.log('message', response);

      /* For somw reason mahmood is notifing me when my answers are graded (I
       * don't care for now!)
       */
      if (typeof response === 'string') {
        console.log({ response });

        setIsloading(false);
      } else if ('error' in response) {
        console.log('Recieved error', response.error);
        if (response.error === 'Section is already submitted') {
          sendJsonMessage({
            action: 'fullTestGetQuestion',
            testId: testId,
          });
          console.log('SENT MESSAGE');
          setIsloading(true);
        } else if (response.error === 'The test is finished') {
          // TODO: Do something better
          navigate('/');
        }
      } else if ('testID' in response) {
        setState(response);
        navigate(`/full-test/${response.testID}`);

        toast.dismiss();
        setIsloading(false);
      } else if ('data' in response) {
        console.log('Recieved data', { response });
        setState(response);

        toast.dismiss();
        setIsloading(false);
      }

      // Message timeout
      setTimeout(() => {
        setIsloading(false);
      }, 10000);
    },
    shouldReconnect: () => true,
  });

  ////// Sign in and Connection //////
  if (readyState !== ReadyState.OPEN)
    return (
      <Layout>
        <Spinner
          message={
            socketUrl === ''
              ? 'You have to sign in first'
              : connectionStatus[readyState]
          }
        />
      </Layout>
    );

  ////// Start test, Submit and Question pages //////
  // Test was not started
  if (!testId) {
    const startTest = () => {
      sendJsonMessage({ action: 'fullTestStart' });
      toast.info('Loading your test...');
    };

    out = (
      <Layout>
        <ConfirmFullTestStart onConfirm={() => startTest()} />
      </Layout>
    );
  }

  // Test was started
  else {
    // No current state
    if (!state) {
      if (!isLoading) {
        sendJsonMessage({
          action: 'fullTestGetQuestion',
          testId: testId,
        });
        console.log('Sent message');
        toast.info('Loading your test...');
        setIsloading(true);
      }

      out = (
        <Layout>
          <Spinner message="Loading..." />
        </Layout>
      );
    }

    // There's a state available
    else {
      console.log('executed w/', state.data.question);
      const submitAnswers = (answers: any) => {
        console.log('Submitting', { answers });
        sendJsonMessage({
          action: 'fullTestSubmit',
          testId: testId,
          data: {
            type: state.type, // listening, reading, writing, speaking
            answer: answers, // this will be based on the section answer schema
          },
        });
        toast.info('Submitting...');
      };
      const autoSaveAnswers = (answers: any) => {
        console.log('Saving', { answers });
        sendJsonMessage({
          action: 'fullTestAutoSave',
          testId: testId,
          data: {
            type: state.type, // listening, reading, writing, speaking
            answer: answers, // this will be based on the section answer schema
          },
        });
        toast.info('Your answer is getting saved...');
      };

      // Auto-submit and submit
      if (state.data === 'Auto-Submitted' || state.data === 'Submitted') {
        const continueTest = () => {
          sendJsonMessage({
            action: 'fullTestGetQuestion',
            testId: testId,
          });
          console.log('Sent message');
          setIsloading(true);
          toast.info(`Loading ${state.type}...`);
        };

        out = (
          <Layout>
            <IntermediatePage
              type={state.type}
              status={state.data}
              onContinue={continueTest}
            />
          </Layout>
        );
      }

      // Question was returned
      else {
        let dummySubmit: any;
        const time = Number(testId.slice(0, testId.indexOf('-')));
        const savedAnswers = state.data?.answer?.answer;

        switch (state.type) {
          case 'listening':
            out = (
              <ListeningQuestionsPage
                listeningSection={state.data.question}
                submitAnswers={submitAnswers}
                autoSaveAnswers={autoSaveAnswers}
                savedAnswers={savedAnswers}
                time={time}
              />
            );
            break;

          case 'reading':
            out = (
              <ReadingQuestions
                readingSection={state.data.question}
                submitAnswers={submitAnswers}
                autoSaveAnswers={autoSaveAnswers}
                savedAnswers={savedAnswers}
                time={time}
              />
            );
            break;

          case 'writing':
            out = (
              <WritingPage
                writingSection={state.data.question}
                submitAnswers={submitAnswers}
                autoSaveAnswers={autoSaveAnswers}
                savedAnswers={savedAnswers}
                time={time}
              />
            );
            break;

          case 'speaking':
            dummySubmit = () =>
              submitAnswers({
                P1: {
                  audioFileNames: [],
                  questions: [],
                },
                P2: {
                  audioFileName: [],
                  question: [],
                },
                P3: {
                  audioFileNames: [],
                  questions: [],
                },
              });

            out = (
              <Layout>
                <h3>Speaking assesment</h3>
                <button onClick={() => dummySubmit()}> Submit </button>
              </Layout>
            );
            break;
        }
      }
    }
  }

  return (
    <>
      {out}
      <ToastContainer pauseOnHover={false} />
    </>
  );
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
