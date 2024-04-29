import '../speaking.css';
import React, { useState } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import agentImage from '../assets/agent.jpeg';

// TODO: Change this approach later
const numQuestions = 4;

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
  const ApiEndPoint = import.meta.env.VITE_API_URL;

  const fetchQuestion = async () => {
    try {
      const randomNumber = Math.floor(Math.random() * numQuestions) + 1;
      const response = await fetch(`${ApiEndPoint}/questions/${randomNumber}`);
      const questionText = await response.json();
      setQuestion(questionText);
      setShowGetQuestion(false);
      narrateQuestion(questionText);
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

      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const audioFileName = generateFileName();
        setAudioURL(URL.createObjectURL(blob));

        axios
          .get(ApiEndPoint + '/generate-presigned-url', {
            params: {
              fileName: audioFileName,
              fileType: blob.type,
            },
          })
          .then(response => {
            const presignedUrl = response.data.url;

            axios
              .put(presignedUrl, blob, {
                headers: {
                  'Content-Type': blob.type,
                },
              })
              .then(() => {
                fetch(ApiEndPoint + '/speaking', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    audioFileName,
                    question,
                  }),
                }).then(response => {
                  response.json().then(body => {
                    console.log(body);
                    setFeedback(body);
                  });
                });
              })
              .catch(error => {
                console.error('Upload error:', error);
              });
          })
          .catch(error => {
            console.error('Error generating presigned URL:', error);
          });
      });
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
