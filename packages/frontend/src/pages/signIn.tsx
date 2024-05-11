import { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      .catch(e => alert(e));
  };

  return (
    <main className='flex justify-center'>
    <div className="login flex flex-col bg-blue-4 w-[750px] rounded-xl max-md:w-full">
      <div className='SignIn w-full flex justify-center pb-7 pt-4'>
        <h1 className='text-4xl font-bold text-white'>Sign In</h1>
      </div>

      <div className=' flex flex-col px-24 pb-3 max-md:px-12'>
        <h2 className='text-xl font-semibold text-white'>Email</h2>
        <input
          type="email"
          autoComplete="off"
          onChange={e => setEmail(e.target.value)}
          className='rounded-lg h-7'
        />
      </div>
      <div className=' flex flex-col px-24 max-md:px-12'>
      <h2 className='text-xl font-semibold text-white'>Password</h2>
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        className='rounded-lg h-7'
      />
      </div>

      <button onClick={handleSignIn}>Login</button>
      <Link to="/sign-up">Don't have an account? Sign up</Link>

      <div>
        <Link to="/"> Back </Link>
      </div>
    </div>
    </main>
  );
}
