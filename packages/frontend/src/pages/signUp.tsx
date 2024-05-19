import { useContext, useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('UOB');
  //TODO: make the institution list dynamic by fetching the list of institutions from the backend
  const authInfo = useContext(AuthContext);

  const signUpHandler = () => {
    console.log({ email, password, institution });
    signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          'custom:Institution': institution,
        },
      },
    })
      .then(() => {
        console.log('Signed up Successfully');
      })
      .catch(e => alert(e))
      .finally(() => {
        authInfo.update();
      });
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
        <select onChange={e => setInstitution(e.target.value)}>
          <option value="UOB">UOB</option>
          <option value="Polytechnic">Polytechnic</option>
        </select>

        <button onClick={signUpHandler}>Sign up</button>
        <Link to="/login">Already have an account?</Link>
      </div>
      <div>
        <Link to="/"> Back </Link>
      </div>
    </>
  );
}
