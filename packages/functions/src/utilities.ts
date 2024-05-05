import {
  BedrockRuntime,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';


/** Helper function for returning websocket errors */
export async function wsError(
  apiClient: ApiGatewayManagementApiClient,
  connectionId: string | undefined,
  code: number,
  message: string,
) {
  const command = new PostToConnectionCommand({
    ConnectionId: connectionId,
    Data: JSON.stringify({ statusCode: code, error: message }),
  });
  await apiClient.send(command);
  return {
    statusCode: code,
    body: JSON.stringify(message),
  };
}
export interface Rubric {
  'Coherence & Cohesion': string;
  'Grammatical Range & Accuracy': string;
  'Lexical Resource': string;
  'Task Responce': string;
  [key: string]: string; // This is the index signature
}

/** Runs Titan Model for the given prompt and returns its output */
export async function runModel(prompt: string) {

  const client = new BedrockRuntime();

  // Model parameters
  const modelParams = {
    inputText: prompt,
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 0.9,
    },
  };

  // Invoke model
  const response = await client.send(
    new InvokeModelCommand({
      body: JSON.stringify(modelParams),
      contentType: 'application/json',
      accept: '*/*',
      modelId: 'amazon.titan-text-express-v1',
    }),
  );

  // Parse model output
  const output = Buffer.from(response.body).toString('utf8');
  const body = JSON.parse(output);
  const text = body.results[0].outputText;

  if (typeof text !== 'string') {
    throw new Error('Unexpected variable type');
  }

  return text;
}