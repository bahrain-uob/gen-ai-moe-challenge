import { APIGatewayProxyHandler } from 'aws-lambda';
import { runModel } from './utilities';

export const main: APIGatewayProxyHandler = async event => {
  const level = event.pathParameters?.level;

  if (!level) {
    console.log('Level parameter missing in request.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Level parameter is required' }),
    };
  }

  function createPrompt(level: string): string {
    return `Create a vocabulary question that has 4 mcq's with an explanation based on the level ${level}
        which represents Common European Framework of Reference for Languages, where
        English Basic User (A1, A2)
        A1 (Beginner)
        A2 (Elementary English)
        English Independent User (B1, B2)
        B1 (Intermediate English)
        B2 (Upper-Intermediate English)
        Proficient English User (C1, C2)
        C1 (Advanced English)
        C2 (Proficiency English)
        NOTE: your response must be in JSON always. Don't add any other information just response with the json.
        An example of what I'm expecting for level A2:
        {
          "question": "Select the correct definition of 'ambiguity'.",
          "choices": [
            { "text": "The quality of being open to more than one interpretation", "isRight": true },
            { "text": "Clarity in presentation", "isRight": false },
            { "text": "A break in continuity", "isRight": false },
            { "text": "The state of being certain", "isRight": false }
          ],
          "explanation": "'Ambiguity' refers to something that can be understood in more than one way."
        }
        make sure ur always just send back a json like the example provide above but it should be based on this level:${level}`;
  }
  //   console.log('Generated Prompt:', createPrompt(level));

  try {
    const rawFeedback = await runModel(createPrompt(level));
    const feedbackJson = JSON.stringify(rawFeedback); // Ensures the feedback is in JSON format
    console.log('Feedback from model:', rawFeedback); // This logs after the promise resolves

    return {
      statusCode: 200,
      body: feedbackJson, // Sending feedback as a JSON string
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error calling the model:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to generate the vocabulary question',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
