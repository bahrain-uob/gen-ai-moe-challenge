import { Link } from 'react-router-dom';
import { post } from 'aws-amplify/api';
import { getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { useEffect } from 'react';

let currentUser: AuthUser;

function TestPage() {
  const testAPIAccess = async () => {
    const request = post({
      apiName: 'myAPI',
      path: '/',
    });

    const response = await request.response;
    console.log('Response', response);
  };

  // Get current user
  useEffect(() => {
    getCurrentUser().then(user => {
      currentUser = user;
    });
  }, []);

  return (
    <>
      <h2> This is a test page</h2>
      <p>{currentUser ? JSON.stringify(currentUser) : 'No current User'}</p>

      <br />
      <button onClick={testAPIAccess}>POST /</button>
      <br />
      <br />
      <Link to="/"> Back </Link>
    </>
  );
}

export default TestPage;
