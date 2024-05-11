import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import agentImage from '../assets/agent.jpeg';
import { get, post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import useWebSocket from 'react-use-websocket';

interface Response {
  Score: string;
  Feedback: string;
}

const narrateQuestion = async (
  key: string,
  setQuestionAudioURL: React.Dispatch<React.SetStateAction<string>>,
) => {
  try {
    const response = await toJSON(
      get({
        apiName: 'myAPI',
        path: `/speakingRecording/${key}`,
      }),
    );
    setQuestionAudioURL(response.url); // Set the URL for the question audio
    const audio = new Audio(response.url);
    audio.play();
  } catch (error) {
    console.error('Error fetching question:', error);
  }
};

const generateFileName = () => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  const randomString = Math.random().toString(36).substring(2, 7);
  return `audio_${timestamp}_${randomString}.webm`;
};

const extractFeedbackSections = (feedback: string) => {
  const scores = feedback.split('Score:').slice(1); // Ignore the first empty split result
  return scores.map(section => 'Score: ' + section.trim());
};

export const SpeakingConversationPage: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [questionAudioURL, setQuestionAudioURL] = useState<string>(''); // New state for question audio URL
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [audioURL, setAudioURL] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [showGetQuestion, setShowGetQuestion] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<undefined | Response>(undefined);
  const [showFeedback1, setShowFeedback1] = useState<boolean>(false);
  const [showFeedback2, setShowFeedback2] = useState<boolean>(false);
  const [showFeedback3, setShowFeedback3] = useState<boolean>(false);
  const [showFeedback4, setShowFeedback4] = useState<boolean>(false);
  const [showQuestionTimer, setShowQuestionTimer] = useState<boolean>(false);
  const [questionTimerCount, setQuestionTimerCount] = useState<number>(20);
  const [showAnswerTimer, setShowAnswerTimer] = useState<boolean>(false);
  const [answerTimerCount, setAnswerTimerCount] = useState<number>(30);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  //get the websocket url from the environment
  const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;

  //initialize the websocket
  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: event => console.log('opened', event),
    onClose: event => console.log('closed', event),
    onMessage: e => {
      console.log('event', e);
      const response = JSON.parse(e.data);
      console.log('message', response);
      setFeedback(response);
      setShowFeedback1(false);
      setShowFeedback2(false);
      setShowFeedback3(false);
    },
    onError: console.log,
    shouldReconnect: () => true,
  });

  const getQueryParameter = (param: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || ''; // Return an empty string if the parameter is not found
  };
  useEffect(() => {
    const indexString = getQueryParameter('index');
    const index = indexString ? parseInt(indexString, 10) : 0; // Use 0 as a fallback if indexString is empty
    setCurrentQuestionIndex(index);
  }, []);

  useEffect(() => {
    let questionTimer: any;
    if (showQuestionTimer && questionTimerCount > 0) {
      questionTimer = setInterval(() => {
        setQuestionTimerCount(prevCount => prevCount - 1);
      }, 1000);
    } else if (questionTimerCount === 0) {
      clearInterval(questionTimer);
      setShowQuestionTimer(false);
      if (!recording && !showGetQuestion) {
        startRecording();
      }
    }
    return () => {
      if (questionTimer) clearInterval(questionTimer);
    };
  }, [showQuestionTimer, questionTimerCount, recording, showGetQuestion]);

  useEffect(() => {
    let answerTimer: any;
    if (showAnswerTimer && answerTimerCount > 0) {
      answerTimer = setInterval(() => {
        setAnswerTimerCount(prevCount => prevCount - 1);
      }, 1000);
    } else if (answerTimerCount === 0) {
      clearInterval(answerTimer);
      setShowAnswerTimer(false);
      if (recording) {
        stopRecording();
      }
    }
    return () => {
      if (answerTimer) clearInterval(answerTimer);
    };
  }, [showAnswerTimer, answerTimerCount, recording]);

  const fetchQuestion = async () => {
    try {
      const questionText = await toJSON(
        get({
          apiName: 'myAPI',
          path: `/question/SpeakingP2P3?index=${currentQuestionIndex}`,
        }),
      );
      setQuestion(questionText.QuestionsP3[currentQuestionIndex].text);
      setShowGetQuestion(false);
      narrateQuestion(
        questionText.QuestionsP3[currentQuestionIndex].S3key,
        setQuestionAudioURL,
      );
      setShowQuestionTimer(true);
      setQuestionTimerCount(20); // Reset the timer
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new RecordRTC(stream, {
        type: 'audio',
      });
      newRecorder.startRecording();
      setRecorder(newRecorder);
      setRecording(true);
      setShowAnswerTimer(true);
      setAnswerTimerCount(30);
      setShowQuestionTimer(false);
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      setRecording(false);
      setSubmitted(true);
      setShowAnswerTimer(false);

      recorder.stopRecording(async () => {
        const blob = recorder.getBlob();
        const audioFileName = generateFileName();
        setAudioURL(URL.createObjectURL(blob));

        const response = await toJSON(
          post({
            apiName: 'myAPI',
            path: '/generate-presigned-url',
            options: {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: {
                fileName: audioFileName,
                fileType: blob.type,
              },
            },
          }),
        );
        const presignedUrl = response.url;

        await axios.put(presignedUrl, blob, {
          headers: {
            'Content-Type': blob.type,
          },
        });

        const audioFileNames: string[] = [];
        const questions: string[] = [];
        console.log(question);

        sendMessage(
          JSON.stringify({
            action: 'gradeSpeakingP1',
            data: {
              audioFileNames: audioFileNames,
              questions: questions,
            },
          }),
        );
      });
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < 5) {
      // Assuming you have a maximum of 5 questions
      window.location.href = `${window.location.origin}${window.location.pathname}?index=${nextIndex}`;
    }
  };

  return (
    <div className="container mx-auto text-center mt-8">
      <h2 className="text-3xl mb-4">Speaking Conversation Assessment</h2>
      <img
        src={agentImage}
        alt="Agent"
        className="object-cover rounded-full mx-auto mb-4"
        style={{ width: '402px', height: '402px' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {questionAudioURL && (
          <div
            style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
          >
            <label style={{ marginRight: '10px' }}>Question:</label>
            <audio controls src={questionAudioURL} className="my-4" />
          </div>
        )}
        {audioURL && (
          <div
            style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}
          >
            <label style={{ marginRight: '10px' }}>Answer:</label>
            <audio controls src={audioURL} className="my-4" />
          </div>
        )}
      </div>
      {showQuestionTimer && (
        <div
          className="timer bg-blue-100 text-blue-800 rounded-full text-3xl font-bold py-2 px-4 mb-4"
          style={{ width: '150px', margin: 'auto', marginBottom: '20px' }}
        >
          {questionTimerCount}s
        </div>
      )}
      {showAnswerTimer && !submitted && (
        <div
          className="timer bg-red-100 text-red-800 rounded-full text-3xl font-bold py-2 px-4 mb-4"
          style={{ width: '150px', margin: 'auto', marginBottom: '20px' }}
        >
          {answerTimerCount}s
        </div>
      )}
      {feedback && feedback.Score && (
        <div
          className="score text-4xl mb-4 mt-8"
          style={{
            width: '200px',
            background: '#E0FFFF',
            padding: '10px',
            borderRadius: '10px',
            margin: 'auto',
            marginBottom: '30px',
          }}
        >
          Score: {feedback.Score}
        </div>
      )}
      <div className="buttons">
        {showGetQuestion && currentQuestionIndex < 4 && (
          <button
            onClick={fetchQuestion}
            disabled={recording}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Get Question
          </button>
        )}
        {!recording &&
          !showGetQuestion &&
          !submitted &&
          currentQuestionIndex < 4 && (
            <button
              onClick={startRecording}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-xl"
            >
              Answer
            </button>
          )}
        {recording && !submitted && (
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Submit
          </button>
        )}
        {feedback && currentQuestionIndex < 4 && (
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-xl mb-4"
          >
            Next Question
          </button>
        )}
        {currentQuestionIndex === 4 && (
          <div className="end-of-questions text-4xl font-bold my-4">
            Conversation Exercise Questions Ended
          </div>
        )}
      </div>
      {feedback &&
        feedback.Feedback &&
        extractFeedbackSections(feedback.Feedback).map((section, index) => (
          <div key={index}>
            <div
              className="feedback-bar bg-blue-200 text-sm text-center p-4 mb-4 cursor-pointer"
              onClick={() => {
                if (index === 0) setShowFeedback1(!showFeedback1);
                if (index === 1) setShowFeedback2(!showFeedback2);
                if (index === 2) setShowFeedback3(!showFeedback3);
                if (index === 3) setShowFeedback4(!showFeedback4);
              }}
            >
              {index === 0
                ? 'Fluency and Coherence'
                : index === 1
                ? 'Lexical Resource'
                : index === 2
                ? 'Grammatical Range and Accuracy'
                : 'Pronunciation'}
            </div>
            {(index === 0 && showFeedback1) ||
            (index === 1 && showFeedback2) ||
            (index === 2 && showFeedback3) ||
            (index === 3 && showFeedback4) ? (
              <div className="feedback-content p-4 mb-4 bg-blue-100">
                {section}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};
