// Note: I'm using requets type any, because I couldn't find a way to import
// types from amplify
export const toJSON = async (request: any) => {
  const response = await request.response;
  const json = await response.body.json();
  return json;
};

/**
 * This is the format of the response sent by the `'POST /grade-writing'`.
 */
export interface WritingGrading {
  'Coherence & Cohesion': string;
  'Grammatical Range & Accuracy': string;
  'Lexical Resource': string;
  'Task Responce': string;
  'Combined Feedback': string;
}
