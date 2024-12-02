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
  speechDuration,
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
  const { pronScore, missPronunciations } = await pronunciationFeedback(
    answer.items,
  );
  const pronFeedback =
    missPronunciations.length > 0
      ? `There are pronunciation mistakes in the words ${missPronunciations.toString()}.`
      : 'There are no pronunciation mistakes.';

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

  /**
   * Ensure 1-2 minutes of speech
   * Went in the middle and required that at least 90 seconds must be spoken
   * Reduced the amount by 15%, accounting for breaks in speech
   */
  const speechSum = speechDuration(answer.items);
  const speechPercentage = speechSum < 1 ? speechSum / 75 : 1; // changed to 1 second. Original: const speechPercentage = speechSum < 75 ? speechSum / 75 : 1;

  // Extract scores from feedback results and calculate the average
  const scores: Array<number> = feedbackResults.map(feedback => {
    const score = feedback.match(/\d(\.\d{1,2})?/gm)![0];
    let number = Math.round(parseFloat(score) * speechPercentage);
    number = number < 1 ? 1 : number;
    return number >= 1 && number <= 9 ? number : 1; // Ensure score is between 1 and 9
  });
  scores.push(Math.round(pronScore * speechPercentage));
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(
    2,
  );

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
