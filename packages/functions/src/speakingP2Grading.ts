import { APIGatewayProxyHandler } from 'aws-lambda';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { wsError, runModel } from './utilities';
import {
  startTranscription,
  storeFeedback,
  retrieveTranscript,
  createPrompt,
  rubric,
  pronunciationFeedback,
} from './utilities/speakingUtilities';

const uploadResponseBucket = process.env.speakingUploadBucketName;
const feedbackTableName = process.env.feedbackTableName;

export const main: APIGatewayProxyHandler = async event => {
  // Get client info
  const { stage, domainName } = event.requestContext;
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: `https://${domainName}/${stage}`,
  });
  const connectionId = event.requestContext.connectionId;

  // Ensure message has a body
  if (event.body == undefined) {
    return await wsError(apiClient, connectionId, 400, 'Bad Request');
  }

  // Parse the event body
  const requestBody = JSON.parse(event.body).data;
  const { audioFileName, question } = requestBody;
  const fileName = audioFileName.slice(0, -5);

  // Ensure audioFileName and question exist in the body
  if (!audioFileName || !question) {
    return await wsError(
      apiClient,
      connectionId,
      400,
      'Missing audio file or question',
    );
  }

  // Ensure that the uploads bucket is defined
  if (uploadResponseBucket == undefined || feedbackTableName == undefined) {
    return await wsError(
      apiClient,
      connectionId,
      500,
      'Upload Bucket Not Found',
    );
  }

  // Starting the transcription
  const transcriptionStatus = await startTranscription(
    fileName,
    uploadResponseBucket,
  );
  if (transcriptionStatus === false) {
    return await wsError(
      apiClient,
      connectionId,
      400,
      'Failed to start transcription',
    );
  }

  // Retreive the transcript from S3
  const answer = await retrieveTranscript(fileName, uploadResponseBucket);
  if (typeof answer !== 'object') {
    return await wsError(
      apiClient,
      connectionId,
      400,
      'Failed to retrieve the transcript',
    );
  }

  // Pronunciation Check
  const { pronScore, pronFeedback } = await pronunciationFeedback(answer.items);

  // Prompt Bedrock
  const criterias = [
    'Fluency and Coherence',
    'Lexical Resource',
    'Grammatical Range and Accuracy',
  ];

  const feedbackResults = await Promise.all(
    criterias.map(criteria =>
      runModel(
        createPrompt(
          criteria,
          rubric[criteria],
          question,
          answer.transcripts[0].transcript as string,
        ),
      ),
    ),
  );

  // Extract scores from feedback results and calculate the average
  const scores: Array<number> = feedbackResults.map(feedback => {
    const score = feedback.match(/\d(\.\d{1,2})?/gm)![0];
    const number = parseFloat(score);
    return number >= 0 && number <= 9 ? number : 0; // Ensure score is between 0 and 9
  });
  scores.push(pronScore);
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(
    2,
  );

  // TODO: Ensure 1-2 minutes of speech

  // Feedback to be returned to the user
  const output = {
    Score: avgScore,
    'Fluency and Coherence': feedbackResults[0],
    'Lexical Resource': feedbackResults[1],
    'Grammatical Range and Accuracy': feedbackResults[2],
    Pronunciation: pronFeedback,
  };

  // Store the result in dynamodb
  const storeStatus = await storeFeedback(
    fileName,
    `${avgScore}`,
    feedbackTableName,
  );
  if (storeStatus === false) {
    return await wsError(
      apiClient,
      connectionId,
      400,
      'Failed to store feedback',
    );
  }

  if (connectionId) {
    const command = new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: JSON.stringify(output),
    });
    const response = await apiClient.send(command);
    console.log('Response:', response);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(output),
  };
};
