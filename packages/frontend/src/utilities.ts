import { useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

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
  'Grammer Tool Feedback'?: Array<{message: string,
                                   context:{text:string, offset:number, length:number, }
                                   [key: string] : any}>;
  'Combined Feedback': string;
}

/**
 * This is a function the will update the url of the websocket with the auth token
 */

export const updateSocketUrl = async (setSocketUrl: (url: string) => void) => {
  
  useEffect(() => {
    const getToken = async () => {
      const token = (
        await fetchAuthSession()
        ).tokens?.idToken?.toString();
        setSocketUrl(`${import.meta.env.VITE_WEBSOCKET_URL as string}?idToken=${token}`);
    }
    getToken();
  }, []);

}