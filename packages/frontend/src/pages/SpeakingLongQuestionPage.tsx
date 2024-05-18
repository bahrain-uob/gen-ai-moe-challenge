import { useState, useEffect } from 'react';
import { getSocketUrl } from '../utilities';
import useWebSocket from 'react-use-websocket';
import RecordRTC from 'recordrtc';
import {
  fetchQuestion,
  startRecording,
  stopRecording,
  generateFileName,
} from '../utilities/speakingUtilities';

type questionType = {
  S3key: string;
  questionText: string;
};

export function SpeakingLongQuestionPage() {
  const [questions, setQuestions] = useState<questionType[] | undefined>();
  const [recorder, setRecorder] = useState<RecordRTC>();

  const socketUrl = getSocketUrl() as string;

  //initialize the websocket
  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: event => console.log('opened', event),
    onClose: event => console.log('closed', event),
    onMessage: e => {
      console.log('event', e);
      const response = JSON.parse(e.data);
      console.log('message', response);
    },
    onError: console.log,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestion();
      setQuestions(fetchedQuestions);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const recordUser = async () => {
      if (questions !== undefined) {
        // TODO: Wait 1 minute
        const recorder = await startRecording();
        setRecorder(recorder);
      }
    };
    recordUser();
  }, [questions]);

  const handleStopRecording = async () => {
    const audioFileName = generateFileName();
    if (questions !== undefined) {
      const questionSet = questions
        .map(question => question.questionText)
        .join('\n');
      if (recorder) stopRecording(recorder, audioFileName);
      sendMessage(
        JSON.stringify({
          action: 'gradeSpeakingP2',
          data: {
            audioFileName: audioFileName,
            question: questionSet,
          },
        }),
      );
      setQuestions(undefined);
    }
  };

  return (
    <div>
      {questions && (
        <>
          <h3>Candidate Task Card</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question.questionText}</li>
            ))}
          </ul>
          <button onClick={handleStopRecording}>Stop Recording</button>
        </>
      )}
      {!questions && <p> Question answered!</p>}
    </div>
  );
}
