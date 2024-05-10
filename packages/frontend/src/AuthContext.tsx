import {
  AuthSession,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
} from 'aws-amplify/auth';
import { createContext, useState } from 'react';

let __authInterval: string | number | NodeJS.Timeout | undefined;

type AuthInfo = {
  authSession: AuthSession;
  user: AuthUser;
};

export const createAuthContext = () => {
  /** Stores `AuthInfo` for the current session */
  const AuthContext = createContext<AuthInfo | undefined>(undefined);
  /** This is used to update the `AuthInfo` */
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);
  // Note that we bind the state to the `AuthInfo` value provided
  const provider = <AuthContext.Provider value={authInfo} />;

  /** Updates the current `AuthInfo` */
  const triggerUpdate = async () => {
    const authSession = await fetchAuthSession({ forceRefresh: true }); // try to refresh the session first
    const user = await getCurrentUser();

    setAuthInfo({ authSession, user });
  };

  // Set update interval
  if (typeof __authInterval !== 'undefined') {
    clearInterval(__authInterval);
  }
  __authInterval = setInterval(triggerUpdate, 5000);

  return { authInfoProvider: provider, updateAuthInfo: triggerUpdate };
};

