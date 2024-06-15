import { Link } from 'react-router-dom';
import { post } from 'aws-amplify/api';
import { getCurrentUser, AuthUser, fetchAuthSession } from 'aws-amplify/auth';
import { useContext, useEffect, useState } from 'react';
import { toJSON } from '../utilities';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import WaveSurferPlayer from './waveformListeningTest';
import { AuthContext } from '../AuthContext';
import { CountdownTimer } from '../components/CountdownTimer';
import { sampleFullTest } from '../utilities/sampleFullTest';

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

  const userInfo = useContext(AuthContext);

  return (
    <>
      <h2> This is a test page</h2>

      <Button onClick={() => recurs(sampleFullTest)}> Test recurs </Button>

      <p>{user ? JSON.stringify(user) : 'No current User'}</p>

      <p className="mt-4 font-light text-lg">Get info using Auth Stack</p>
      {userInfo ? (
        <>
          <p className="mb-3">
            Auth Session = {JSON.stringify(userInfo.authSession)}
          </p>
          <p className="mb-3">User info = {JSON.stringify(userInfo.user)}</p>
        </>
      ) : (
        <p>No Current User</p>
      )}

      <br />
      <button onClick={testAPIAccess}>POST /</button>
      <br />
      <br />
      <Link to="/"> Back </Link>

      <ColorPalette />

      <div className="my-8">
        <Button isActive>regular</Button>
        <Button isActive>isActive regular</Button>
        <Button NoBackground>NoBackground</Button>
        <Button NoBackground isActive>
          isActive NoBackground
        </Button>
      </div>

      <CountdownTimer duration={5} onTimeUp={() => console.log('finished')} />

      <ModalDemo />

      <div className="mt-8 px-4">
        <WaveSurferPlayer audioUrl="https://upload.wikimedia.org/wikipedia/commons/e/ef/Beijing_Subway_Line_4_train_announcement_from_Zhongguancun_to_Haidianhuangzhuang_20200323.ogg" />
      </div>
    </>
  );
}

const ColorPalette = () => {
  const baseClasses = 'w-16 h-16 border ';

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

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const message = `- This is my thing
  - blah 
  - blah`;

  return (
    <div className="mt-8 px-4">
      {/* <button onChange={() => setIsOpen(true)}>Open Modal</button> */}
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <br />
      <br />
      <Modal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        modalMessage={message}
      />
    </div>
  );
};

const recurs = (input: any) => {
  // Base case
  if (typeof input !== 'object') {
    return input;
  }

  // Array case
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      recurs(input[i]);
    }
  }

  // Object case
  else {
    const keys = Object.keys(input);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      // Match with keys
      if (key.toLowerCase().endsWith('key')) {
        console.log('Found', { key, value: input[key] });

        input[key] = 'blah';
      }

      recurs(input[key]);
    }
  }
};
