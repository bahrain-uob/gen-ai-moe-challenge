import { post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import axios from 'axios';

export async function submitAudioFile(audioFileName: string, blob: Blob) {
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
  console.log('successful upload');
}

export function generateFileName() {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
  const randomString = Math.random().toString(36).substring(2, 7);
  return `audio_${timestamp}_${randomString}.webm`;
}
