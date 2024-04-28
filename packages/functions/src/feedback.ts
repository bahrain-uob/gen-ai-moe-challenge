import {
  BedrockRuntime,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { S3Event, S3Handler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const bedrockClient = new BedrockRuntime();
const s3Client = new S3Client();
const dynamoClient = new DynamoDBClient();

const uploadBucketName = process.env.uploadBucketName;
const FeedbackTableName = process.env.FeedbackTableName;

export const main: S3Handler = async (event: S3Event) => {
  const s3Record = event.Records[0].s3;
  const transcribeBucketName = s3Record.bucket.name;
  const key = s3Record.object.key;

  try {
    const headCommand = new HeadObjectCommand({
      Bucket: uploadBucketName,
      Key: `${key.slice(0, -5)}.mp3`,
    });
    const metadataResponse = await s3Client.send(headCommand);
    let question = metadataResponse.Metadata?.question || 'Open Question';

    const getObjectCommand = new GetObjectCommand({
      Bucket: transcribeBucketName,
      Key: key,
    });
    const contentResponse = await s3Client.send(getObjectCommand);
    if (!contentResponse.Body) throw new Error('No content found');

    const body = await contentResponse.Body.transformToString('utf-8');
    if (body.length === 0) {
      console.log(`file ${key} is empty`);
      return;
    }
    const answer = JSON.parse(body).results.transcripts[0].transcript;
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

    // Extract scores from feedback results and calculate the average
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
    const averageScore =
      validScores.reduce((acc, score) => acc + score, 0) /
      (validScores.length || 1);

    // Combine all feedback into one string
    const combinedFeedback = feedbackResults.join('\n\n');

    // Log each feedback result and the average score
    feedbackResults.forEach((feedback, index) => {
      console.log(`${criterias[index]}: ${feedback}\n\n`);
    });

    console.log(`Average Score: ${averageScore.toFixed(2)}`);

    // Prepare item for DynamoDB
    const item = {
      feedbackId: { S: `${Date.now()}` }, // Using timestamp for a unique ID
      feedbackScore: { N: `${averageScore}` }, // Storing average score as a Number
      feedbackText: { S: combinedFeedback }, // Storing combined feedback as a single String
    };

    // Store to DynamoDB
    const command = new PutItemCommand({
      TableName: FeedbackTableName,
      Item: item,
    });

    await dynamoClient.send(command);
    console.log('Feedback stored successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};

async function runModel(prompt: string) {
  const modelParams = {
    inputText: prompt,
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 0.9,
    },
  };

  const invokeModelCommand = new InvokeModelCommand({
    body: JSON.stringify(modelParams),
    contentType: 'application/json',
    accept: '*/*',
    modelId: 'amazon.titan-text-express-v1',
  });

  const response = await bedrockClient.send(invokeModelCommand);
  return JSON.parse(Buffer.from(response.body).toString('utf8')).results[0]
    .outputText;
}
const rubric = {
  'Fluency and Coherence':
    'Score: 9\nFluent with only very occasional repetition or self-correction.\n\nAny hesitation that occurs is used only to prepare the content of the next utterance and not to find words or grammar.\n\nSpeech is situationally appropriate and cohesive features are fully acceptable.\n\nTopic development is fully coherent and appropriately extended. \n--------------------\n\nScore: 8\nFluent with only very occasional repetition or self-correction.\n\nHesitation may occasionally be used to find words or grammar, but most will be content related.\n\nTopic development is coherent, appropriate and relevant.\n--------------------\n\nScore: 7\nAble to keep going and readily produce long turns without noticeable effort.\n\nSome hesitation, repetition and/or self-correction may occur, often mid-sentence and indicate problems with accessing appropriate language. However, these will not affect coherence\n\nFlexible use of spoken discourse markers, connectives and cohesive features.\n--------------------\n\nScore: 6\nAble to keep going and demonstrates a willingness to produce long turns.\n\nCoherence may be lost at times as a result of hesitation, repetition and/or self-correction.\n\nUses a range of spoken discourse markers, connectives and cohesive features though not always appropriately.\n--------------------\n\nScore: 5\nUsually able to keep going, but relies on repetition and self-correction to do so and/or on slow speech.\n\nHesitations are often associated with mid-sentence searches for fairly basic lexis and grammar\n\nOveruse of certain discourse markers, connectives and other cohesive features.\n\nMore complex speech usually causes disfluency but simpler language may be produced fluently\n--------------------\n\nScore: 4\nUnable to keep going without noticeable pauses.\n\nSpeech may be slow with frequent repetition.\n\nOften self-corrects.\n\nCan link simple sentences but often with repetitious use of connectives.\n\nSome breakdowns in coherence.\n--------------------\n\nScore: 3\nFrequent, sometimes long, pauses occur while candidate searches for words.\n\nLimited ability to link simple sentences and go beyond simple responses to questions.\n\nFrequently unable to convey basic message.\n--------------------\n\nScore: 2\nLengthy pauses before nearly every word.\n\nIsolated words may be recognisable but speech is of virtually no communicative significance.\n--------------------\n\nScore: 1\nEssentially none.\n\nSpeech is totally incoherent.\n--------------------\n\nScore: 0\nDoes not attend\n--------------------\n\nAdditional Criterion: Responses that are notably shorter than expected will receive a lower score, reflecting insufficient elaboration. Similarly, scores will be adjusted downward for content that is irrelevant to the prompt.\n\n',
  'Lexical Resource':
    'Score: 9\nTotal flexibility and precise use in all contexts.\n\nSustained use of accurate and idiomatic language.\n--------------------\n\nScore: 8\nWide resource, readily and flexibly used to discuss all topics and convey precise meaning.\n\nSkilful use of less common and idiomatic items despite occasional inaccuracies in word choice and collocation.\n\nEffective use of paraphrase as required.\n--------------------\n\nScore: 7\nResource flexibly used to discuss a variety of topics.\n\nSome ability to use less common and idiomatic items and an awareness of style and collocation is evident though inappropriacies occur.\n\nEffective use of paraphrase as required.\n--------------------\n\nScore: 6\nResource sufficient to discuss topics at length.\n\nVocabulary use may be inappropriate but meaning is clear.\n\nGenerally able to paraphrase successfully.\n--------------------\n\nScore: 5\nResource sufficient to discuss familiar and unfamiliar topics but there is limited flexibility.\n\nAttempts paraphrase but not always with success.\n--------------------\n\nScore: 4\nResource sufficient for familiar topics but only basic meaning can be conveyed on unfamiliar topics.\n\nFrequent inappropriacies and errors in word choice.\n\nRarely attempts paraphrase.\n--------------------\n\nScore: 3\nResource limited to simple vocabulary used primarily to convey personal information.\n\nVocabulary inadequate for unfamiliar topics.\n--------------------\n\nScore: 2\nVery limited resource. Utterances consist of isolated words or memorised utterances.\n\nLittle communication possible without the support of mime or gesture.\n--------------------\n\nScore: 1\nNo resource bar a few isolated words.\n\nNo communication possible.\n--------------------\n\nScore: 0\nDoes not attend\n--------------------\n\nAdditional Criterion: Irrelevant vocabulary use or overly brief responses that fail to demonstrate lexical resource will be scored lower.\n\n',
  'Grammatical Range and Accuracy':
    'Score: 9\nStructures are precise and accurate at all times, apart from ‘mistakes’ characteristic of native speaker speech.\n--------------------\n\nScore: 8\nWide range of structures, flexibly used.\n\nThe majority of sentences are error free.\n\nOccasional inappropriacies and non-systematic errors occur. A few basic errors may persist.\n--------------------\n\nScore: 7\nA range of structures flexibly used. Error-free sentences are frequent.\n\nBoth simple and complex sentences are used effectively despite some errors. A few basic errors persist.\n--------------------\n\nScore: 6\nProduces a mix of short and complex sentence forms and a variety of structures with limited flexibility.\n\nThough errors frequently occur in complex structures, these rarely impede communication.\n--------------------\n\nScore: 5\nBasic sentence forms are fairly well controlled for accuracy\n\nComplex structures are attempted but these are limited in range, nearly always contain errors and may lead to the need for reformulation.\n--------------------\n\nScore: 4\nCan produce basic sentence forms and some short utterances are error-free.\n\nSubordinate clauses are rare and, overall, turns are short, structures are repetitive and errors are frequent.\n--------------------\n\nScore: 3\nBasic sentence forms are attempted but grammatical errors are numerous except in apparently memorised utterances.\n--------------------\n\nScore: 2\nNo evidence of basic sentence forms.\n--------------------\n\nScore: 1\nNo rateable language unless memorised.\n--------------------\n\nScore: 0\nDoes not attend\n--------------------\n\nAdditional Criterion: Inadequate length or irrelevance in responses will lead to a lower score, as they fail to adequately demonstrate grammatical proficiency.\n\n',
};
function createPrompt(
  criteriaName: string,
  gradingRubric: string,
  question: string,
  answer: string,
): string {
  return `
Given that IELTS speaking is graded on ${criteriaName} the score can be between 0-9 according to the following rubric/scoring criteria:
<rubric>
${gradingRubric}
</rubric>

You are an IELTS examiner tasked with evaluating student's answer according to the criteria:

The student was given the following question:
<question>
${question}
</question>

And the student answered as follows:
<answer>
${answer}
</answer>

first, Grade the student's answer based on the provided rubric and give it a score from 0-9 then give the feedback accordingly based
on ${criteriaName} criteria. And provide feedback referencing specific parts of the student's answer relevant to your grading. 
Provide feedback that is concise, clear, and directly relevant to the student's work. Ensure it is easily understandable and kept within a moderate word count to maintain focus.
Always Begin your feedback with the score as an example 'Score: [applicable number]', followed by your remarks'. 
`;
}
