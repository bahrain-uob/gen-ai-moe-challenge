import { useContext } from 'react';
import { AuthContext } from './AuthContext';

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
