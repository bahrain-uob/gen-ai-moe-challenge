import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

function App() {
  const signOutHandler = () => {
    signOut()
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch(error => {
        console.log('error signing out: ', error);
      });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          <Link to="/test"> Test page </Link>
          <br />
          <br />
          <Link to="/writing"> Writing </Link>
          <br />
          <br />
          <Link to="/speaking"> Speaking </Link>
          <br />
          <br />
          <Link to="/Listening/Polly"> Listening </Link>
          <br />
          <br />
          <Link to="/sign-up"> Sign up </Link>
          <br />
          <br />
          <Link to="/sign-in"> Sign in </Link>
          <br />
          <br />
          <button onClick={signOutHandler}> Sign out </button>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>sara</p>
    </>
  );
}

export default App;
