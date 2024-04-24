import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState('');

  function onClick() {
    console.log(import.meta.env.VITE_API_URL);
    fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(setCount);
  }

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
        <button onClick={onClick}>count is {count ? count : 'unknown'}</button>
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
          <Link to="/sign-up"> Sign up </Link>
          <br />
          <br />
          <Link to="/sign-in"> Sign in </Link>
        </p>
        <p> Sayed Ahmed was here </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>sara</p>
    </>
  );
}

export default App;
