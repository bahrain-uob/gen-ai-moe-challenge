import { Link } from 'react-router-dom';

function TestPage() {
  return (
    <>
      <h2> This is a test page</h2>
      <Link to="/"> Back </Link>
    </>
  );
}

export default TestPage;
