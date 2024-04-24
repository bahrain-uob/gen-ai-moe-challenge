import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpHandler = () => {
    console.log({ email, password });
    signUp({
      username: email,
      password,
    })
      .then(() => {
        console.log('Signed in Successfully');
      })
      .catch(e => alert(e));
  };

  return (
    <>
      <p> P@ssw0rd </p>
      <div className="signup">
        <input
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={signUpHandler}>Sign up</button>
        <Link to="/login">Already have an account?</Link>
      </div>
      <div>
        <Link to="/"> Back </Link>
      </div>
    </>
  );
}
