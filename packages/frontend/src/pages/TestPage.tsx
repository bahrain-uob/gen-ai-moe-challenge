import { Link } from 'react-router-dom';
import { post } from 'aws-amplify/api';
import { getCurrentUser, AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { toJSON } from '../utilities';
import { WaveSurferComponent } from './waveformComponent';

async function _getCurrentUser() {
  try {
    await fetchAuthSession({ forceRefresh: true }); // try to refresh the session first
    const user = await getCurrentUser();
    return user;
  } catch (error: any) {
    if (error.name == 'UserUnAuthenticatedException') {
      console.log('Not logged in');
    } else {
      throw error;
    }
  }
}

function TestPage() {
  const [user, setUser] = useState<AuthUser | undefined>(undefined);

  const testAPIAccess = async () => {
    const response = await toJSON(
      post({
        apiName: 'myAPI',
        path: '/',
      }),
    );

    console.log(response);
  };

  // Get current user
  useEffect(() => {
    _getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <h2> This is a test page</h2>
      <p>{user ? JSON.stringify(user) : 'No current User'}</p>

      <br />
      <button onClick={testAPIAccess}>POST /</button>
      <br />
      <br />
      <Link to="/"> Back </Link>

      <ColorPalette />
      <div className="mt-8 px-4">
        <WaveSurferComponent audioUrl="https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg" />
      </div>
    </>
  );
}

const ColorPalette = () => {
  const baseClasses = 'w-16 h-16 ';

  return (
    <>
      <p> Hover over a color for its name </p>
      <div className="flex flex-row mt-4">
        <div className={baseClasses + 'bg-blue-4'} title="blue-4"></div>
        <div className={baseClasses + 'bg-blue-3'} title="blue-3"></div>
        <div className={baseClasses + 'bg-blue-2'} title="blue-2"></div>
        <div className={baseClasses + 'bg-blue-1'} title="blue-1"></div>
        <div className="ml-4"></div>
        <div className={baseClasses + 'bg-grey-4'} title="grey-4"></div>
        <div className={baseClasses + 'bg-grey-3'} title="grey-3"></div>
        <div className={baseClasses + 'bg-grey-2'} title="grey-2"></div>
        <div className={baseClasses + 'bg-grey-1'} title="grey-1"></div>
      </div>
    </>
  );
};

export default TestPage;
