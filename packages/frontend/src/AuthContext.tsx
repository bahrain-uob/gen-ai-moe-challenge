import {
  AuthSession,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
} from 'aws-amplify/auth';
import { createContext, useEffect, useState } from 'react';

let __authInterval: string | number | NodeJS.Timeout | undefined;

type AuthInfo = {
  authSession: AuthSession;
  user: AuthUser;
};

/** Stores `AuthInfo` for the current session
 *
 * Note that we later bind the state to the `AuthInfo` value provided
 */
export const AuthContext = createContext<AuthInfo | undefined>(undefined);

/** Retrieve the current `AuthInfo` */
const getAuthInfo = async (): Promise<AuthInfo> => {
  const authSession = await fetchAuthSession({ forceRefresh: true }); // try to refresh the session first
  const user = await getCurrentUser();

  return { authSession, user };
};

export const AuthInfoProvider = ({ children }: { children: any }) => {
  /** This is used to update the `AuthInfo` */
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    getAuthInfo().then(authInfo => setAuthInfo(authInfo));
  }, []);

  // Set update interval
  if (typeof __authInterval !== 'undefined') {
    clearInterval(__authInterval);
  }
  // __authInterval = setInterval(() => {
  //   getAuthInfo().then(authInfo => setAuthInfo(authInfo));
  // }, 30000);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
