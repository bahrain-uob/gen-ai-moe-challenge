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
import { runModel } from './utilities';

const bedrockClient = new BedrockRuntime();
const s3Client = new S3Client();
const dynamoClient = new DynamoDBClient();

const uploadBucketName = process.env.uploadBucketName;
const FeedbackTableName = process.env.FeedbackTableName;

type rubricType = {
  [key: string]: string;
};

/*
  Extracts the question from the metadata of the user's response.
  Retrieves the transcribed user response, then invokes bedrock.
  The response is then parsed and the score and feedback are stored.
*/
export const main: S3Handler = async (event: S3Event) => {
  const s3Record = event.Records[0].s3;
  const transcribeBucketName = s3Record.bucket.name;
  const key = s3Record.object.key;

  const command = new HeadObjectCommand({
    Bucket: uploadBucketName,
    Key: `${key.slice(0, -5)}.mp3`,
  });
  const response = await s3Client.send(command);
  let question = 'Open Question';
  if (response.Metadata) {
    question = response.Metadata.question;
  }

  try {
    const commandOutput = await s3Client.send(
      new GetObjectCommand({
        Bucket: transcribeBucketName,
        Key: key,
      }),
    );
    if (!commandOutput.Body) {
      return;
    }
    const content = await commandOutput.Body.transformToString('utf-8');
    if (content.length === 0) {
      console.log(`file ${key} is empty`);
    } else {
      const answer = JSON.parse(content).results.transcripts[0].transcript;
      const prompt = createPrompt(rubric, question, answer);

      /// runmodel starts here
      // const input = {
      //   inputText: prompt,
      //   textGenerationConfig: {
      //     maxTokenCount: 4096,
      //     stopSequences: [],
      //     temperature: 0,
      //     topP: 0.9,
      //   },
      // };

      // const command = new InvokeModelCommand({
      //   body: JSON.stringify(input),
      //   contentType: 'application/json',
      //   accept: '*/*',
      //   modelId: 'amazon.titan-text-express-v1',
      // });

      // const response = await bedrockClient.send(command);
      // const response_byte = response.body;

      // const textDecoder = new TextDecoder('utf-8');
      // const decodedString = textDecoder.decode(response_byte);

      // const feedbackResult = JSON.parse(decodedString).results[0].outputText;
      /// runmodel ends here
      //new runmodel
      const feedbackResult = await runModel(prompt);
      //new runmodel ends here

      const score_index = feedbackResult.indexOf('Score:');
      const feedback_index = feedbackResult.indexOf('Feedback:');
      const score = feedbackResult
        .substring(score_index + 'Score: '.length, feedback_index)
        .trim();
      const feedback = feedbackResult
        .substring(feedback_index + 'Feedback: '.length)
        .trim();
      console.log(score);
      console.log(feedback);

      const item = {
        feedbackId: { S: `${Math.random()}` },
        feedbackScore: { S: score },
        feedbackText: { S: feedback },
      };
      try {
        const command = new PutItemCommand({
          TableName: FeedbackTableName,
          Item: item,
        });
        await dynamoClient.send(command);
        return;
      } catch (error) {
        console.log('Error storing result');
        return;
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// We can have the Transcribe confidence level as a metric for pronunciation
const rubric = {
  'Fluency and Coherence':
    'Score: 9\nFluent with only very occasional repetition or self-correction.\n\nAny hesitation that occurs is used only to prepare the content of the next utterance and not to find words or grammar.\n\nSpeech is situationally appropriate and cohesive features are fully acceptable.\n\nTopic development is fully coherent and appropriately extended. \n--------------------\n\nScore: 8\nFluent with only very occasional repetition or self-correction.\n\nHesitation may occasionally be used to find words or grammar, but most will be content related.\n\nTopic development is coherent, appropriate and relevant.\n--------------------\n\nScore: 7\nAble to keep going and readily produce long turns without noticeable effort.\n\nSome hesitation, repetition and/or selfcorrection may occur, often mid-sentence and indicate problems with accessing appropriate language. However, these will not affect coherence\n\nFlexible use of spoken discourse markers, connectives and cohesive features.\n--------------------\n\nScore: 6\nAble to keep going and demonstrates a willingness to produce long turns.\n\nCoherence may be lost at times as a result of hesitation, repetition and/or self-correction.\n\nUses a range of spoken discourse markers, connectives and cohesive features though not always appropriately.\n--------------------\n\nScore: 5\nUsually able to keep going, but relies on repetition and self-correction to do so and/or on slow speech.\n\nHesitations are often associated with mid-sentence searches for fairly basic lexis and grammar\n\nOveruse of certain discourse markers, connectives and other cohesive features.\n\nMore complex speech usually causes disfluency but simpler language may be produced fluently\n--------------------\n\nScore: 4\nUnable to keep going without noticeable pauses.\n\nSpeech may be slow with frequent repetition.\n\nOften self-corrects.\n\nCan link simple sentences but often with repetitious use of connectives.\n\nSome breakdowns in coherence.\n--------------------\n\nScore: 3\nFrequent, sometimes long, pauses occur while candidate searches for words.\n\nLimited ability to link simple sentences and go beyond simple responses to questions.\n\nFrequently unable to convey basic message.\n--------------------\n\nScore: 2\nLengthy pauses before nearly every word.\n\nIsolated words may be recognisable but speech is of virtually no communicative significance.\n--------------------\n\nScore: 1\nEssentially none.\n\nSpeech is totally incoherent.\n--------------------\n\nScore: 0\nDoes not attend\n--------------------\n\n',
  'Lexical Resource':
    'Score: 9\nTotal flexibility and precise use in all contexts.\n\nSustained use of accurate and idiomatic language.\n--------------------\n\nScore: 8\nWide resource, readily and flexibly used to discuss all topics and convey precise meaning.\n\nSkilful use of less common and idiomatic items despite occasional inaccuracies in word choice and collocation.\n\nEffective use of paraphrase as required.\n--------------------\n\nScore: 7\nResource flexibly used to discuss a variety of topics.\n\nSome ability to use less common and idiomatic items and an awareness of style and collocation is evident though inappropriacies occur.\n\nEffective use of paraphrase as required.\n--------------------\n\nScore: 6\nResource sufficient to discuss topics at length.\n\nVocabulary use may be inappropriate but meaning is clear.\n\nGenerally able to paraphrase successfully.\n--------------------\n\nScore: 5\nResource sufficient to discuss familiar and unfamiliar topics but there is limited flexibility.\n\nAttempts paraphrase but not always with success.\n--------------------\n\nScore: 4\nResource sufficient for familiar topics but only basic meaning can be conveyed on unfamiliar topics.\n\nFrequent inappropriacies and errors in word choice.\n\nRarely attempts paraphrase.\n--------------------\n\nScore: 3\nResource limited to simple vocabulary used primarily to convey personal information.\n\nVocabulary inadequate for unfamiliar topics.\n--------------------\n\nScore: 2\nVery limited resource. Utterances consist of isolated words or memorised utterances.\n\nLittle communication possible without the support of mime or gesture.\n--------------------\n\nScore: 1\nNo resource bar a few isolated words.\n\nNo communication possible.\n--------------------\n\nScore: 0\nDoes not attend\n--------------------\n\n',
  'Grammatical Range and Accuracy':
    'Score: 9\nStructures are precise and accurate at all times, apart from ‘mistakes’ characteristic of native speaker speech.\n--------------------\n\nScore: 8\nWide range of structures, flexibly used.\n\nThe majority of sentences are error free.\n\nOccasional inappropriacies and non-systematic errors occur. A few basic errors may persist.\n--------------------\n\nScore: 7\nA range of structures flexibly used. Error-free sentences are frequent.\n\nBoth simple and complex sentences are used effectively despite some errors. A few basic errors persist.\n--------------------\n\nScore: 6\nProduces a mix of short and complex sentence forms and a variety of structures with limited flexibility.\n\nThough errors frequently occur in complex structures, these rarely impede communication.\n--------------------\n\nScore: 5\nBasic sentence forms are fairly well controlled for accuracy\n\nComplex structures are attempted but these are limited in range, nearly always contain errors and may lead to the need for reformulation.\n--------------------\n\nScore: 4\nCan produce basic sentence forms and some short utterances are error-free.\n\nSubordinate clauses are rare and, overall, turns are short, structures are repetitive and errors are frequent.\n--------------------\n\nScore: 3\nBasic sentence forms are attempted but grammatical errors are numerous except in apparently memorised utterances.\n--------------------\n\nScore: 2\n**No evidence of basic sentence forms.**\n--------------------\n\nScore: 1\nNo rateable language unless memorised.\n--------------------\n\nScore: 0\nDoes not attend\n--------------------\n\n',
};

function createPrompt(
  grading_rubric: rubricType,
  speaking_question: string,
  speaking_answer: string,
) {
  return `
  You are an IELTS examiner tasked with evaluating students' answers for the speaking section of the exam. 
  The student was given the following question:
<question>
${speaking_question}
</question>

And the student answered as follows:
<answer>
${speaking_answer}
</answer>

Grade the student's answer based on the provided rubric and give it a score accordingly. Also provide feedback referencing specific parts of the student's answer relevant to your grading.
Given that IELTS speaking is graded on Fluency and Coherence, Lexical Resource, and Grammatical Range and Accuracy; according to the following rubric/scoring criteria:
<rubric>
A candidate must fully fit the positive features of the descriptor at a particular level.
Fluency and Coherence:
${grading_rubric['Fluency and Coherence']}
---------
Lexical Resource:
${grading_rubric['Lexical Resource']}
---------
Grammatical Range and Accuracy:
${grading_rubric['Grammatical Range and Accuracy']}
</rubric>
--------
Please provide the feedback in this exact format (do not deviate from this format at all):
Score: (The score should be the average of the levels in each criteria)
Feedback: (Provide detailed feedback and base it on the student's response)
`;
}
