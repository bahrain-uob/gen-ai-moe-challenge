import '../speaking.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import agentImage from '../assets/agent.jpeg'; // Import agent image

const YourComponent: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [audioURL, setAudioURL] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [showGetQuestion, setShowGetQuestion] = useState<boolean>(true);
  const ApiEndPoint = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Narrate the question when it is retrieved
    if (question) {
      narrateQuestion(question);
    }
  }, [question]);

  const narrateQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser');
    }
  };

  const fetchQuestion = async () => {
    try {
      const numQuestions = 4;
      const randomNumber = Math.floor(Math.random() * numQuestions) + 1;
      const response = await axios.get<{ questionText: string }>(
        ApiEndPoint + '/questions/' + randomNumber,
      );
      setQuestion(response.data.questionText);
      setShowGetQuestion(false); // Hide Get Question button
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
      setRecording(true); // Start recording
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const generateFileName = (originalFileName: string) => {
    const fileExtension = originalFileName.split('.').pop();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    const randomString = Math.random().toString(36).substring(2, 7);
    return `audio_${timestamp}_${randomString}.${fileExtension}`;
  };

  const stopRecording = () => {
    if (recorder) {
      setRecording(false); // Stop recording
      setShowGetQuestion(true); // Show Get Question button after stopping recording

      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const audioFileName = generateFileName('recording.mp3');
        setAudioURL(URL.createObjectURL(blob));

        axios
          .get(ApiEndPoint + '/generate-presigned-url', {
            params: {
              fileName: audioFileName, // Use the dynamically generated file name
              fileType: blob.type,
              questionText: question,
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
                console.log('Upload successful');
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
    </div>
  );
};

export default YourComponent;
