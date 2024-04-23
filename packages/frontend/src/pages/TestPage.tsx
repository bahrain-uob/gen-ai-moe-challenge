import { Link } from 'react-router-dom';
import { post } from 'aws-amplify/api';

function TestPage() {
  const testAPIAccess = async () => {
    const request = post({
      apiName: 'myAPI',
      path: '/',
    });

    const response = await request.response;
    console.log('Response', response);
  };

  return (
    <>
      <h2> This is a test page</h2>
      <button onClick={testAPIAccess}>POST /</button>
      <br />
      <br />
      <Link to="/"> Back </Link>
    </>
  );
}

export default TestPage;
