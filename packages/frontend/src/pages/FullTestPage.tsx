import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { ConfirmFullTestStart } from '../components/ConfirmFullTestStart';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSocketUrl } from '../utilities';
import { useState } from 'react';

export const FullTestPage = () => {
  const [state, setState] = useState<any>(null);
  const { testId } = useParams();

  const socketUrl = useSocketUrl() ?? '';

  const { readyState } = useWebSocket(socketUrl, {
    onOpen: event => console.log('opened', event),
    onClose: event => console.log('closed', event),
    onMessage: e => {
      console.log('event', e);
      const response = JSON.parse(e.data);
      console.log('message', response);
      setState(response);
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

  if (!testId) {
    const startTest = () => {};

    return (
      <Layout>
        <ConfirmFullTestStart onConfirm={() => startTest()} />
      </Layout>
    );
  }
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
