import { useState, useEffect } from 'react';
import { getSocketUrl } from '../utilities';
import useWebSocket from 'react-use-websocket';
import {
  fetchQuestion,
  narrateQuestion,
  startRecording,
  stopRecording,
  generateFileName,
} from '../utilities/speakingUtilities';
import RecordRTC from 'recordrtc';

type questionType = {
  S3key: string;
  questionText: string;
};

export function SpeakingConversationPage() {
  const [questions, setQuestions] = useState<questionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<questionType>();
  const [recorder, setRecorder] = useState<RecordRTC>();
  const [fileName, setFileName] = useState<string>('');

  const allQuestions: string[] = [];
  const allResponses: string[] = [];

  const socketUrl = getSocketUrl() as string;

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

  // Fetches the questions form the database once
  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestion();
      setQuestions(fetchedQuestions);
      setCurrentQuestion(fetchedQuestions.shift());
    };
    getQuestions();
  }, []);

  // Any changes in the current question will invoke this
  useEffect(() => {
    const recordUser = async () => {
      if (currentQuestion !== undefined) {
        await narrateQuestion(currentQuestion.S3key);
        const recorder = await startRecording();
        setRecorder(recorder);
      }
    };
    recordUser();
  }, [currentQuestion]);

  const handleStopRecording = () => {
    const audioFileName = generateFileName();
    setFileName(audioFileName);
    if (recorder) stopRecording(recorder, audioFileName);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    allResponses.push(fileName);
    if (currentQuestion) allQuestions.push(currentQuestion.questionText);
    if (questions.length > 0) {
      const nextQuestion: questionType | undefined = questions.shift();
      if (nextQuestion !== undefined) {
        setCurrentQuestion(nextQuestion);
      }
    } else {
      setCurrentQuestion(undefined);
      submitAnswers();
    }
  };

  const submitAnswers = () => {
    sendMessage(
      JSON.stringify({
        action: 'gradeSpeakingP1',
        data: {
          audioFileNames: allResponses,
          questions: allQuestions,
        },
      }),
    );
  };

  return (
    <div>
      {currentQuestion && (
        <>
          <h3>{currentQuestion.questionText}</h3>
          <button onClick={handleStopRecording}>Stop Recording</button>
        </>
      )}
      {currentQuestion === undefined && questions.length === 0 && (
        <p>All questions answered!</p>
      )}
    </div>
  );
}
