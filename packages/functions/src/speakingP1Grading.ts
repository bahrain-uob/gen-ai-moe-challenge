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
} from './utilities/speakingUtilities';

const uploadResponseBucket = process.env.speakingUploadBucketName;
const feedbackTableName = process.env.feedbackTableName;

const missPronunciations: string[] = [];
let pronunciationScore: number;
let pronunciationFeedbackString: string;

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
  if (typeof answer !== 'string') {
    return await wsError(
      apiClient,
      connectionId,
      400,
      'Failed to retrieve the transcript',
    );
  }

  /* Prompt Bedrock */
  const criterias = [
    'Fluency and Coherence',
    'Lexical Resource',
    'Grammatical Range and Accuracy',
  ];

  const feedbackResults = await Promise.all(
    criterias.map(criteria =>
      runModel(createPrompt(criteria, rubric[criteria], question, answer)),
    ),
  );

  /* Extract scores from feedback results and calculate the average */
  const scores = feedbackResults.map(feedback => {
    // Find the line containing 'Score:' and extract the number
    const scoreLine = feedback
      .split('\n')
      .find((line: string) => line.includes('Score:'));
    const scoreStr = scoreLine?.match(/\d+/)?.[0];
    if (!scoreStr) {
      console.error('No score found in feedback:', feedback);
      return 0;
    }
    return parseInt(scoreStr, 10);
  });

  const validScores = scores.filter(score => !isNaN(score));
  validScores.push(pronunciationScore);
  const averageScore =
    Math.round(
      (validScores.reduce((acc, score) => acc + score, 0) /
        (validScores.length || 1)) *
        2,
    ) / 2;

  // Combine all feedback into one string
  let combinedFeedback = feedbackResults.join('\n\n');
  combinedFeedback = combinedFeedback.concat(pronunciationFeedbackString);

  // Log each feedback result and the average score
  // feedbackResults.forEach((feedback, index) => {
  //   console.log(`${criterias[index]}: ${feedback}\n\n`);
  // });
  // console.log(pronunciationFeedbackString);

  // console.log(`\n\nAverage Score: ${averageScore.toFixed(2)}`);

  const output = {
    Score: averageScore.toFixed(2),
    Feedback: combinedFeedback,
  };

  /* Store the result in dynamodb */
  const storeStatus = await storeFeedback(
    fileName,
    `${averageScore.toFixed(2)}`,
    combinedFeedback,
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

/** This function formulates the feedback string for the mispronuncitions in the user's response */
function pronunciationFeedback(score: number, misses: string[]) {
  const base = `\nScore: ${score}\n\nFeedback: `;
  if (score < 9) {
    return base.concat(
      `There are some mispronunciations like ${misses.toString()}.`,
    );
  }
  return base.concat('There are no mispronunciations.');
}
