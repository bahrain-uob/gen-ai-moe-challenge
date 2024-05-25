import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { runModel } from '../utilities';
import {
  startTranscription,
  retrieveTranscript,
  createPrompt,
  rubric,
  pronunciationFeedback,
  speechDuration,
} from '../utilities/speakingUtilities';
import {
  SpeakingAnswer,
  SpeakingFeedbackAll,
  SpeakingSection,
} from 'src/utilities/fullTestUtilities';
import { saveFeedback } from 'src/utilities/fullTestFunctions';
import { Bucket } from 'sst/node/bucket';
import { SpeakingFeedback } from '../../../frontend/src/utilities/types';

const uploadResponseBucket = Bucket.Uploads.bucketName;
// const feedbackTableName = process.env.feedbackTableName;

export const gradeSpeaking = async (
  PK: string,
  SK: string,
  questions: SpeakingSection,
  answer: SpeakingAnswer,
  connectionId: string,
  endpoint: string,
  publish: boolean = false,
) => {
  const grading = [
    gradeSpeakingP1(
      answer.answer!.P1.questions,
      answer.answer!.P1.audioFileNames,
    ),
    gradeSpeakingP2(
      answer.answer!.P2.question,
      answer.answer!.P2.audioFileName,
    ),
    gradeSpeakingP1(
      answer.answer!.P3.questions,
      answer.answer!.P3.audioFileNames,
    ),
  ];
  const _feedbacks = await Promise.all(grading);

  const feedback: SpeakingFeedbackAll = {
    P1: _feedbacks[0],
    P2: _feedbacks[1],
    P3: _feedbacks[2],
  };

  // Save feedback to the DB
  const newTestItem = await saveFeedback(PK, SK, 'speakingAnswer', feedback);
  // Send feedback to the client
  const apiClient = new ApiGatewayManagementApiClient({
    endpoint: endpoint,
  });

  const command = new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: JSON.stringify(publish ? newTestItem : 'Speaking graded'),
  });
  const response = await apiClient.send(command);
};

export const gradeSpeakingP1 = async (
  questions: string[],
  audioFileNames: string[],
): Promise<SpeakingFeedback> => {
  if (!questions.length || !audioFileNames.length) {
    return {
      error: 'No questions or audio files found',
    };
  }

  if (questions.length == 0 || audioFileNames.length == 0) {
    return {
      error: 'No questions or audio files found',
    };
  }

  //   const { audioFileNames, questions } = requestBody;
  const fileNames = audioFileNames.map((file: string) => {
    return file.slice(0, -5);
  });

  // Ensure audioFileNames and questions exist in the body
  if (!audioFileNames || !questions) {
    return {
      error: 'Missing audio file or question',
    };
  }

  // Ensure that the uploads bucket is defined
  if (uploadResponseBucket == undefined) {
    //|| feedbackTableName == undefined) {
    return {
      error: 'Upload Bucket Not Found',
    };
  }

  // Starting the transcription
  const transcriptionStatuses = await Promise.all(
    fileNames.map((fileName: string) => {
      return startTranscription(fileName, uploadResponseBucket);
    }),
  );
  for (let transcriptionStatus of transcriptionStatuses) {
    if (transcriptionStatus === false) {
      return {
        error: 'Failed to start transcription',
      };
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
      return {
        error: 'Failed to retrieve the transcript',
      };
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

  const pronScoreUnv = Math.round(
    pronScores.reduce((a, b) => a + b, 0) / pronScores.length,
  );
  const pronScore = Number.isFinite(pronScoreUnv) ? pronScoreUnv : 0;
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
          questions.toString(),
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
  const expectedLength = 15 * questions.length;
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
  const avgScore =
    scores.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) / scores.length;

  // Feedback to be returned to the user
  const output: SpeakingFeedback = {
    score: avgScore,
    'Fluency & Coherence': {
      text: feedbackResults[0],
      score: Number.isFinite(scores[0]) ? scores[0] : 0,
    },
    'Lexical Resource': {
      text: feedbackResults[1],
      score: Number.isFinite(scores[0]) ? scores[1] : 0,
    },
    'Grammatical Range & Accuracy': {
      text: feedbackResults[2],
      score: Number.isFinite(scores[0]) ? scores[2] : 0,
    },
    Pronunciation: {
      text: pronFeedback,
      score: Number.isFinite(pronScore) ? pronScore : 0,
    },
  };

  return output;
};

export const gradeSpeakingP2 = async (
  question: string,
  audioFileName: string,
): Promise<SpeakingFeedback> => {
  const fileName = audioFileName.slice(0, -5);

  // Ensure audioFileName and question exist in the body
  if (!audioFileName || !question) {
    return {
      error: 'Missing audio file or question',
    };
  }

  // Ensure that the uploads bucket is defined
  if (uploadResponseBucket == undefined) {
    //|| feedbackTableName == undefined) {
    return {
      error: 'Upload Bucket Not Found',
    };
  }

  // Starting the transcription
  const transcriptionStatus = await startTranscription(
    fileName,
    uploadResponseBucket,
  );
  if (transcriptionStatus === false) {
    return {
      error: 'Failed to start transcription',
    };
  }

  // Retreive the transcript from S3
  const answer = await retrieveTranscript(fileName, uploadResponseBucket);
  if (typeof answer !== 'object') {
    return {
      error: 'Failed to retrieve the transcript',
    };
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
  const speechPercentage = speechSum < 75 ? speechSum / 75 : 1;

  // Extract scores from feedback results and calculate the average
  const scores: Array<number> = feedbackResults.map(feedback => {
    const score = feedback.match(/\d(\.\d{1,2})?/gm)![0];
    let number = Math.round(parseFloat(score) * speechPercentage);
    number = number < 1 ? 1 : number;
    return number >= 1 && number <= 9 ? number : 1; // Ensure score is between 1 and 9
  });
  scores.push(Math.round(pronScore * speechPercentage));
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  // Feedback to be returned to the user
  // const output = {
  //   Score: avgScore,
  //   'Fluency and Coherence': feedbackResults[0],
  //   'Lexical Resource': feedbackResults[1],
  //   'Grammatical Range and Accuracy': feedbackResults[2],
  //   Pronunciation: pronFeedback,
  // };

  const output: SpeakingFeedback = {
    score: avgScore,
    'Fluency & Coherence': {
      text: feedbackResults[0],
      score: Number.isFinite(scores[0]) ? scores[0] : 0,
    },
    'Lexical Resource': {
      text: feedbackResults[1],
      score: Number.isFinite(scores[0]) ? scores[1] : 0,
    },
    'Grammatical Range & Accuracy': {
      text: feedbackResults[2],
      score: Number.isFinite(scores[0]) ? scores[2] : 0,
    },
    Pronunciation: {
      text: pronFeedback,
      score: Number.isFinite(pronScore) ? pronScore : 0,
    },
  };
  return output;
};
