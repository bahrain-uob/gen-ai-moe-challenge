import '../speaking.css';
import React, { useState } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import agentImage from '../assets/agent.jpeg';
import { get, post } from 'aws-amplify/api';
import { toJSON } from '../utilities';

interface Response {
  Score: string;
  Feedback: string;
}

const narrateQuestion = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  } else {
    console.error('Speech synthesis not supported in this browser');
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
  const [feedback, setFeedback] = useState(undefined as undefined | Response);

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
      narrateQuestion(questionText.Questions[0].text);
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
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      setRecording(false);
      setShowGetQuestion(true);

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
        });
      }); // end `stopRecording`
    }
  };

  return (
    <div className="container">
      <h2>Speaking Assessment</h2>
      <img src={agentImage} alt="Agent" className="agent" />
      {!audioURL && (
        <div className="buttons">
          {showGetQuestion && (
            <button onClick={fetchQuestion} disabled={recording}>
              Get Question
            </button>
          )}
          {!recording && !showGetQuestion && (
            <button onClick={startRecording}>Start Recording</button>
          )}
          {recording && <button onClick={stopRecording}>Stop Recording</button>}
        </div>
      )}
      {audioURL && <audio controls src={audioURL} />}
      {feedback && (
        <div className="feedback">
          <p>Score: {feedback.Score}</p>
          <p>Feedback: {feedback.Feedback}</p>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
