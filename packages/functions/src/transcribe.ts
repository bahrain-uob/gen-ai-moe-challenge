import { S3Event, Handler } from 'aws-lambda';
import {
  StartTranscriptionJobCommand,
  TranscribeClient,
} from '@aws-sdk/client-transcribe';

const transcribeClient = new TranscribeClient();
const outBucket = process.env.outBucket;

export const main: Handler = async (event: S3Event) => {
  const s3Record = event.Records[0].s3;
  const bucketName = s3Record.bucket.name;
  const key = s3Record.object.key;

  try {
    const transcriptionJob = await transcribeClient.send(
      new StartTranscriptionJobCommand({
        TranscriptionJobName: `${key.slice(0, -4)}`,
        LanguageCode: 'en-US',
        MediaFormat: 'mp3',
        Media: {
          MediaFileUri: `s3://${bucketName}/${key}`,
        },
        OutputBucketName: outBucket,
      }),
    );
  } catch (err) {
    console.error('Error:', err);
  }
};
