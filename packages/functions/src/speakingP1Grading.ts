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
  const { audioFileNames, questions } = requestBody;
  const fileNames = audioFileNames.map((file: string) => {
    return file.slice(0, -5);
  });

  // Ensure audioFileNames and questions exist in the body
  if (!audioFileNames || !questions) {
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
  const transcriptionStatuses = await Promise.all(
    fileNames.map((fileName: string) => {
      return startTranscription(fileName, uploadResponseBucket);
    }),
  );
  for (let transcriptionStatus of transcriptionStatuses) {
    if (transcriptionStatus === false) {
      return await wsError(
        apiClient,
        connectionId,
        400,
        'Failed to start transcription',
      );
    }
  }

  // Retreive the transcript from S3
  const answers = await Promise.all(
    fileNames.map((fileName: string) => {
      return retrieveTranscript(fileName, uploadResponseBucket);
    }),
  );
  for (let answer of answers) {
    if (typeof answer !== 'object') {
      return await wsError(
        apiClient,
        connectionId,
        400,
        'Failed to retrieve the transcript',
      );
    }
  }

  // Pronunciation Check
  const pronScores = [],
    pronMistakes: string[] = [];
  for (let answer of answers) {
    const { pronScore, missPronunciations } = await pronunciationFeedback(
      answer.items,
    );
    pronScores.push(pronScore);
    pronMistakes.concat(missPronunciations);
  }

  const pronScore = Math.round(
    pronScores.reduce((a, b) => a + b, 0) / pronScores.length,
  );
  const pronFeedback =
    pronMistakes.length > 0
      ? `There are pronunciation mistakes in the words ${pronMistakes.toString()}.`
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
          questions,
          answers.map(answer => answer.transcripts[0].transcript as string),
        ),
      ),
    ),
  );

  /**
   * Ensure 15 seconds of speech per question
   */
  const speechSum = answers.reduce((acc, answer) => {
    return acc + speechDuration(answer.items);
  }, 0);
  const expectedLength = 1 * questions.length; // changed to 1 second. Original: const expectedLength = 15 * questions.length;
  const speechPercentage =
    speechSum < expectedLength ? speechSum / expectedLength : 1;

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
    // TODO: Store Feedback properly
    fileNames[0],
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
