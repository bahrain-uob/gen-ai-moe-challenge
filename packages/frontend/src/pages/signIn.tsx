import { useContext, useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authInfo = useContext(AuthContext);

  const handleSignIn = () => {
    signIn({ username: email, password })
      .then(user => {
        /* For potential values of `signInStep`, see
         * https://docs.amplify.aws/react/build-a-backend/auth/enable-sign-up/#sign-in
         */
        if (user.nextStep.signInStep === 'DONE') {
          console.log('Logged in succesfully');
        } else {
          console.log(
            `Not logged in.  Next step is ${user.nextStep.signInStep}`,
          );
        }
      })
      .catch(e => alert(e))
      .finally(() => {
        authInfo.update();
      });
  };

  return (
    <div className="login">
      <input
        type="email"
        placeholder="email"
        autoComplete="off"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSignIn}>Login</button>
      <Link to="/sign-up">Don't have an account? Sign up</Link>

      <div>
        <Link to="/"> Back </Link>
      </div>
    </div>
  );
}
