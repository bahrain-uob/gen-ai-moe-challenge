import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import agentImage from '../assets/agent.jpeg';
import { get, post } from 'aws-amplify/api';
import { toJSON } from '../utilities';

interface Response {
  Score: string;
  Feedback: string;
}

const narrateQuestion = async (key: string) => {
  try {
    const response = await toJSON(
      get({
        apiName: 'myAPI',
        path: `/speakingRecording/${key}`,
      }),
    );
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

const YourComponent: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [audioURL, setAudioURL] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [showGetQuestion, setShowGetQuestion] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<undefined | Response>(undefined);
  const [showFeedback1, setShowFeedback1] = useState<boolean>(false);
  const [showFeedback2, setShowFeedback2] = useState<boolean>(false);
  const [showFeedback3, setShowFeedback3] = useState<boolean>(false);
  const [showQuestionTimer, setShowQuestionTimer] = useState<boolean>(false);
  const [questionTimerCount, setQuestionTimerCount] = useState<number>(20);
  const [showAnswerTimer, setShowAnswerTimer] = useState<boolean>(false);
  const [answerTimerCount, setAnswerTimerCount] = useState<number>(30);
  const [submitted, setSubmitted] = useState<boolean>(false);
  useEffect(() => {
    let questionTimer: any;
    if (showQuestionTimer && questionTimerCount > 0) {
      questionTimer = setInterval(() => {
        setQuestionTimerCount(prevCount => prevCount - 1);
      }, 1000);
    } else if (questionTimerCount === 0) {
      clearInterval(questionTimer);
      setShowQuestionTimer(false); // Hide the timer
      if (!recording && !showGetQuestion) {
        startRecording(); // Start recording automatically
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
      setShowAnswerTimer(false); // Hide the timer
      if (recording) {
        stopRecording(); // Stop recording automatically
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
          path: '/question/SpeakingP1',
        }),
      );
      setQuestion(questionText.Questions[0].text);
      setShowGetQuestion(false);
      narrateQuestion(questionText.Questions[0].S3key);
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
      setAnswerTimerCount(30); // Reset the timer
      setShowQuestionTimer(false);
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      setRecording(false); // Make sure to set recording to false immediately
      setSubmitted(true);
      setShowAnswerTimer(false); // Ensure the timer is hidden

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

        toJSON(
          post({
            apiName: 'myAPI',
            path: '/speaking',
            options: {
              headers: {
                'Content-Type': 'application/json',
              },
              body: {
                audioFileName,
                question,
              },
            },
          }),
        ).then(response => {
          setFeedback(response);
          setShowFeedback1(false);
          setShowFeedback2(false);
          setShowFeedback3(false);
        });
      }); // end `stopRecording`
    }
  };

  return (
    <div className="container mx-auto text-center mt-8">
      <h2 className="text-3xl mb-4">Speaking Long-Question Assessment</h2>
      <img
        src={agentImage}
        alt="Agent"
        className="object-cover rounded-full mx-auto mb-4"
        style={{ width: '402px', height: '402px' }}
      />
      {showQuestionTimer && (
        <div
          className="timer bg-blue-100 text-blue-800 rounded-full text-3xl font-bold py-2 px-4 mb-4"
          style={{ width: '150px', margin: 'auto', marginBottom: '20px' }} // Added marginBottom here
        >
          {questionTimerCount}s
        </div>
      )}

      {showAnswerTimer && (
        <div
          className="timer bg-red-100 text-red-800 rounded-full text-3xl font-bold py-2 px-4 mb-4"
          style={{ width: '150px', margin: 'auto', marginBottom: '20px' }} // Added marginBottom here
        >
          {answerTimerCount}s
        </div>
      )}
      {audioURL && <audio controls src={audioURL} className="mx-auto my-4" />}
      {feedback && feedback.Score && (
        <div
          className="score text-4xl mb-4 mt-8"
          style={{
            width: '200px',
            background: '#E0FFFF',
            padding: '10px',
            borderRadius: '10px',
            margin: 'auto',
            marginBottom: '30px', // Increased bottom margin
          }}
        >
          Score: {feedback.Score}
        </div>
      )}
      <div className="buttons">
        {showGetQuestion && (
          <button
            onClick={fetchQuestion}
            disabled={recording}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Get Question
          </button>
        )}
        {!recording && !showGetQuestion && !submitted && (
          <button
            onClick={startRecording}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Answer
          </button>
        )}
        {recording && (
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Submit
          </button>
        )}
      </div>
      {feedback && (
        <div className="feedback">
          <div
            className="feedback-bar bg-blue-200 text-sm text-center p-4 mb-4 cursor-pointer"
            onClick={() => setShowFeedback1(!showFeedback1)}
          >
            Fluency and Coherence
          </div>
          {showFeedback1 && (
            <div className="feedback-content p-4 mb-4 bg-blue-100">
              {feedback.Feedback.slice(
                0,
                feedback.Feedback.indexOf('Feedback'),
              )}
            </div>
          )}
          <div
            className="feedback-bar bg-green-200 text-sm text-center p-4 mb-4 cursor-pointer"
            onClick={() => setShowFeedback2(!showFeedback2)}
          >
            Lexical Resource
          </div>
          {showFeedback2 && (
            <div className="feedback-content p-4 mb-4 bg-green-100">
              {feedback.Feedback.slice(
                feedback.Feedback.indexOf('Feedback'),
                feedback.Feedback.lastIndexOf('Feedback'),
              )}
            </div>
          )}
          <div
            className="feedback-bar bg-yellow-200 text-sm text-center p-4 mb-4 cursor-pointer"
            onClick={() => setShowFeedback3(!showFeedback3)}
          >
            Grammatical Range and Accuracy
          </div>
          {showFeedback3 && (
            <div className="feedback-content p-4 mb-4 bg-yellow-100">
              {feedback.Feedback.slice(
                feedback.Feedback.lastIndexOf('Feedback'),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YourComponent;
