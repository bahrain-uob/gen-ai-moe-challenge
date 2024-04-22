import { S3Event, Handler } from 'aws-lambda';
import {
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';

const transcribeClient = new TranscribeClient();
const transcribeOutputBucket = process.env.outBucket;

/*
  Starts a transcription job for the given mp3 file and
  stores the transcription in the transcription_bucket.
*/
export const main: Handler = async (event: S3Event) => {
  const s3Record = event.Records[0].s3;
  const transcribeInputBucket = s3Record.bucket.name;
  const key = s3Record.object.key;

  try {
    await transcribeClient.send(
      new StartTranscriptionJobCommand({
        TranscriptionJobName: `${key.slice(0, -4)}`,
        LanguageCode: 'en-US',
        MediaFormat: 'mp3',
        Media: {
          MediaFileUri: `s3://${transcribeInputBucket}/${key}`,
        },
        OutputBucketName: transcribeOutputBucket,
      }),
    );
  } catch (err) {
    console.error('Error:', err);
  }
};
