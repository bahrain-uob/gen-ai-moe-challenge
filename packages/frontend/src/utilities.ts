import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { formatRelative, subDays } from 'date-fns';

// Note: I'm using requets type any, because I couldn't find a way to import
// types from amplify
export const toJSON = async (request: any) => {
  const response = await request.response;
  const json = await response.body.json();
  return json;
};

/** Get authenticated socket url, returns undefined if not signed in, or there
 * where any other issues
 *
 * This uses the `AuthContext` under the hood to get the JWT token, and injects
 * it in the url for authentication.
 */
export const useSocketUrl = (): string | undefined => {
  const authInfo = useContext(AuthContext);

  const token = authInfo.authSession?.tokens?.idToken?.toString();
  if (!token) return;

  // console.log(`URL is ${import.meta.env.VITE_WEBSOCKET_URL}?idToken=${token}`);
  return `${import.meta.env.VITE_WEBSOCKET_URL}?idToken=${token}`;
};

export const getRelativeTime = (examId: string): string => {


  const date = new Date(Number(examId.split('-')[0]));
  // return formatRelative(subDays(date, 3), date) ;
  return date.toDateString();
};

////// Full Test Feedback Cache //////
const getFeedbackKey = (testId: string) => `FeedbackItem-${testId}`;

/**
 * Pull cached feedback from browser storage
 *
 * @param testId  The `id` of the test.
 * @returns the full test item if it exists, null otherwise
 */
export const getCachedFeedback = (testId: string) => {
  const localData = sessionStorage.getItem(getFeedbackKey(testId));
  if (localData) console.log('Using cached', { localData });
  return localData ? JSON.parse(localData) : localData;
};

/**
 * Cach feedback in browser storage.
 *
 * @param feedback  The feedback to store in cache
 * @param testId  The `id` of the test.
 */
export const setCachedFeedback = (feedback: any, testId: string) => {
  sessionStorage.setItem(getFeedbackKey(testId), JSON.stringify(feedback));
};
