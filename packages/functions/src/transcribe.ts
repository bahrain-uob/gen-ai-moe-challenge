import { S3Event, Handler } from "aws-lambda";
import { S3Client } from "@aws-sdk/client-s3";
import {
  StartTranscriptionJobCommand,
  TranscribeClient,
  GetTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

const s3 = new S3Client();
const transcribeClient = new TranscribeClient();
const outBucket = process.env.outBucket;

export const main: Handler = async (event: S3Event) => {
  const s3Record = event.Records[0].s3;
  const bucketName = s3Record.bucket.name;
  const key = s3Record.object.key;

  try {
    // Start the transcription job
    const transcriptionJob = await transcribeClient.send(
      new StartTranscriptionJobCommand({
        TranscriptionJobName: `${key.slice(0, -4)}`,
        LanguageCode: "en-US",
        MediaFormat: "mp3",
        Media: {
          MediaFileUri: `s3://${bucketName}/${key}`,
        },
        OutputBucketName: outBucket,
      })
    );
    //console.log("Transcription job started:", transcriptionJob);

    // Check if transcriptionJob contains TranscriptionJob before accessing it
    if (transcriptionJob.TranscriptionJob) {
      // Wait for the transcription job to complete
      let status;
      do {
        const response = await transcribeClient.send(
          new GetTranscriptionJobCommand({
            TranscriptionJobName:
              transcriptionJob.TranscriptionJob.TranscriptionJobName,
          })
        );
        status = response.TranscriptionJob?.TranscriptionJobStatus;
        //console.log("Transcription job status:", status);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 5 seconds before checking again
      } while (status === "IN_PROGRESS");

      // Once the transcription job is completed, retrieve the transcription result
      if (status === "COMPLETED") {
        const transcriptionResult = await transcribeClient.send(
          new GetTranscriptionJobCommand({
            TranscriptionJobName:
              transcriptionJob.TranscriptionJob.TranscriptionJobName,
          })
        );
        // console.log("Transcription job details:", transcriptionResult);
      } else {
        console.error("Transcription job failed or canceled");
      }
    } else {
      console.error("Transcription job not available");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
