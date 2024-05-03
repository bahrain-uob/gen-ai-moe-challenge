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

const extractFeedbackSections = (feedback: string) => {
  const scores = feedback.split('Score:').slice(1); // Ignore the first empty split result
  return scores.map(section => 'Score: ' + section.trim());
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
          path: '/question/SpeakingP1',
        }),
      );
      setQuestion(questionText.Questions[0].text);
      setShowGetQuestion(false);
      narrateQuestion(questionText.Questions[0].S3key);
      setShowQuestionTimer(true);
      setQuestionTimerCount(20);
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
      });
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
            marginBottom: '30px',
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
        {recording && !submitted && (
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Submit
          </button>
        )}
      </div>
      {feedback &&
        feedback.Feedback &&
        extractFeedbackSections(feedback.Feedback).map((section, index) => (
          <div key={index}>
            <div
              className={`feedback-bar bg-${
                index === 0 ? 'blue' : index === 1 ? 'green' : 'yellow'
              }-200 text-sm text-center p-4 mb-4 cursor-pointer`}
              onClick={() => {
                if (index === 0) setShowFeedback1(!showFeedback1);
                if (index === 1) setShowFeedback2(!showFeedback2);
                if (index === 2) setShowFeedback3(!showFeedback3);
              }}
            >
              {index === 0
                ? 'Fluency and Coherence'
                : index === 1
                ? 'Lexical Resource'
                : 'Grammatical Range and Accuracy'}
            </div>
            {(index === 0 && showFeedback1) ||
            (index === 1 && showFeedback2) ||
            (index === 2 && showFeedback3) ? (
              <div
                className={`feedback-content p-4 mb-4 bg-${
                  index === 0 ? 'blue' : index === 1 ? 'green' : 'yellow'
                }-100`}
              >
                {section}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default YourComponent;
