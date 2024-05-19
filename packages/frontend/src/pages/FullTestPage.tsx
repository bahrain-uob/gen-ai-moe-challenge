import { useParams } from 'react-router-dom';
import { Layout } from '../Layout';
import { ConfirmFullTestStart } from '../components/ConfirmFullTestStart';
import useWebSocket from 'react-use-websocket';
import { useSocketUrl } from '../utilities';
import { useState } from 'react';

export const FullTestPage = () => {
  const [state, setState] = useState<any>(null);
  const { testId } = useParams();

  const socketUrl = useSocketUrl();
  if (!socketUrl) {
    return (
      <Layout>
        {`We have an issue connecting with the server :(`}
        <br />
        Please try again later
      </Layout>
    );
  }

  const {} = useWebSocket(socketUrl, {
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

  if (!testId) {
    return (
      <Layout>
        <ConfirmFullTestStart />
      </Layout>
    );
  }
};
