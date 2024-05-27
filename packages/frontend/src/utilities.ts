import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Note: I'm using requets type any, because I couldn't find a way to import
// types from amplify
export const toJSON = async (request: any) => {
  const response = await request.response;
  const json = await response.body.json();
  return json;
};

/**
 * This is the format of writing section questions
 */
export type WritingSection = {
  task1: {
    question: string;
    graphDescription: string;
    graphUrl: string;
  };
  task2: {
    question: string;
  };
};

/** Sample writing section */
export const writingSection: WritingSection = {
  task1: {
    question:
      'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying fulltime or part-time.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    graphDescription:
      'Period: 1970/71\n- Number of men: 1000 as part-time and 100 as full-time\n- Number of women: 700 as part-time and 50 as full-time\n\nPeriod: 1980/81\n- Number of men: 850 as part-time and 150 as full-time\n- Number of women: 800 as part-time and 200 as full-time\n\nPeriod: 1990/91\n- Number of men: 900 as part-time and 225 as full-time\n- Number of women: 1100 as part-time and 225 as full-time',
    graphUrl: '/assets/out-000.png',
    // answer:
    //   'This is a bar chart of the number of men and women in further education in Britain in three periods.  In 1970, Most of Men were studying part-time but from 1980, studying part-time was decreased and studying full-time was increased and in 1990, it was twice as many students as in 1970.  On the other hand, women studying Full-time were increased and not only Full-time, part-time also were increased, in 1990, Studying full-time was three times as many students as in 1970.  If compare Men and Women, as you see, in 1970, Men were Studying more than women full-time or part-time but it changed from 1980 and then, in 1990, Women were studying part-time more than Men and Studying full-time was same number.  It shows you Women has a high education now.',
  },
  task2: {
    question:
      'Space exploration is much too expensive and the money should be spent on more important things.\n\nWhat is your opinion?',
    // answer:
    //   'There is an argument that exploring space is a waste of money and that there are more urgent needs to be addressed on earth, such as reducing poverty and preventing environmental destruction. However, I completely disagree with this opinion for two reasons.\n\nFirst of all, many of the technologies we take for granted today were originated thanks to space research. Take satellite technology, for example, which we depend on for broadcasting and weather forecasting. Without satellites, we would not be able to follow global events as they happen, nor give populations any warning of approaching storms. Space research has also led to the development of new lightweight materials that offer us heat protection and enable food preservation. Therefore, the challenge of sending human beings into space has often driven the development of new technologies that benefit our everyday lives.\n\nSecond, we cannot foresee the distant future, so we ought to develop the capability to escape from the earth. Gradually, we are learning how humans can survive for long periods in space and even travel to other planets in the future. If space exploration is halted, this valuable knowledge will never be acquired. It is true that environmental destruction is also a serious issue, but it is also true that we remain dependent on our environment if we never accept the challenge of exploring other worlds.\n\nIn conclusion, while we undoubtedly face serious problems on our own planet, it is imperative that we continue to explore space. This will promote further technological advances as well as provide a possible means of escape should earth become uninhabitable in future. Ideally, all nations should cooperate in the advancement of space research.',
  },
};

////// Feedback related types //////

export type Feedback = { score: number; text: string };
/**
 * This is the format of the response sent by the `'POST /grade-writing'`.
 */
export type WritingFeedback = {
  'Coherence & Cohesion': Feedback;
  'Grammatical Range & Accuracy': Feedback;
  'Lexical Resource': Feedback;
  'Task Responce': Feedback;
  'Grammer Tool Feedback'?: Array<{
    message: string;
    context: { text: string; offset: number; length: number };
    [key: string]: any;
  }>;
  'Combined Feedback': string;
  score: number;
};

export type SpeakingFeedback = {
  score: number;
  'Fluency & Coherence': Feedback;
  'Lexical Resource': Feedback;
  'Grammatical Range & Accuracy': Feedback;
  Pronunciation: Feedback;
};

export type Error = {
  error: string;
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
