import {
  AuthSession,
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
} from 'aws-amplify/auth';
import { createContext, useEffect, useState } from 'react';

// This will be our authentication state
type PartialAuthInfo = {
  authSession?: AuthSession;
  user?: AuthUser;
};

// This is the exported object.  It has an additional update, so that any
// component can trigger an update.
type AuthInfo = PartialAuthInfo & {
  update: () => Promise<void>;
};

/** Stores `AuthInfo` for the current session
 *
 * Note that we later bind state in `AuthInfoProvider` to the `AuthInfo` value provided
 */
export const AuthContext = createContext<AuthInfo>({
  update: () => Promise.resolve(),
});

/** Retrieve the current `AuthInfo` */
const getAuthInfo = async (): Promise<PartialAuthInfo> => {
  try {
    const authSession = await fetchAuthSession({ forceRefresh: true }); // try to refresh the session first
    const user = await getCurrentUser();

    return { authSession, user };
  } catch (err: any) {
    if (err?.name === 'UserUnAuthenticatedException') {
      return {};
    }
    throw err;
  }
};

export const AuthInfoProvider = ({ children }: { children: any }) => {
  const [authInfo, setAuthInfo] = useState<PartialAuthInfo>({});

  const updateAuthInfo = async () => {
    const newAuthInfo = await getAuthInfo();
    setAuthInfo(newAuthInfo);
  };

  useEffect(() => {
    // Initially set auth info
    updateAuthInfo();

    // Update auth info on intervals
    const timerId = setInterval(() => updateAuthInfo(), 300000);
    return () => clearInterval(timerId);
  }, []);

  const value: AuthInfo = {
    authSession: authInfo.authSession,
    user: authInfo.user,
    update: updateAuthInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
