import {
  BedrockRuntime,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

const client = new BedrockRuntime();

export const main: APIGatewayProxyHandlerV2 = async event => {
  if (event.body == undefined) {
    return { statusCode: 400, body: 'No valid input' };
  }

  const prompt = JSON.parse(event.body!)['prompt'];
  const inputBody = {
    inputText: prompt,
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 0.9,
    },
  };

  const command = new InvokeModelCommand({
    body: JSON.stringify(inputBody),
    contentType: 'application/json',
    accept: '*/*',
    modelId: 'amazon.titan-text-express-v1',
  });

  const response = await client.send(command);
  const output = Buffer.from(response.body).toString('utf8');
  const body = JSON.parse(output);
  const text = body.results[0].outputText;

  return {
    statusCode: 200,
    body: text,
  };
};
