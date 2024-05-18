import { get, post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import RecordRTC from 'recordrtc';
import axios from 'axios';

export type questionsType = {
  S3key: string;
  questionText: string;
};

export async function narrateQuestion(key: string) {
  try {
    const response = await toJSON(
      get({
        apiName: 'myAPI',
        path: `/speakingRecording/${key}`,
      }),
    );
    const audio = new Audio(response.url);
    audio
      .play()
      .catch(error => console.error('Error playing the audio:', error));
  } catch (error) {
    console.error('Error fetching question:', error);
  }
}

export function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  const randomString = Math.random().toString(36).substring(2, 7);
  return `audio_${timestamp}_${randomString}.webm`;
}

export async function fetchQuestion(): Promise<questionsType[]> {
  const questionText = await toJSON(
    get({
      apiName: 'myAPI',
      path: '/question/SpeakingP1',
    }),
  );
  return questionText.Questions;
}

export async function startRecording(): Promise<RecordRTC> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const newRecorder = new RecordRTC(stream, {
    type: 'audio',
  });
  newRecorder.startRecording();
  return newRecorder;
}

export function stopRecording(recorder: RecordRTC, audioFileName: string) {
  return new Promise<void>((resolve, reject) => {
    recorder.stopRecording(async () => {
      try {
        const blob = recorder.getBlob();
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
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
