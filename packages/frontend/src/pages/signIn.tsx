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
    <div className="flex min-h-full mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex-col justify-center px-6 py-12 lg:px-8 bg-stone-300 rounded-md shadow-md mt-10">
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='mt-4 mb-5 text-center text-3xl  font-roboto leading-9 tracking-tight text-gray-900'>
          Sign in
        </h1>
      </div>

      <div className='mt-5'>
      <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
        </label>

      <div className="mt-2">
      <input
        type="email"
        
        autoComplete="off"
        onChange={e => setEmail(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 px-4   "
      />

      </div>  

      </div>


      <div className='mt-5'>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Password
        </label>
        </div>  
      <div className="mt-2"></div>
      <input
        type="password"
        
        onChange={e => setPassword(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 px-4  "
      />
    
      
      </div>

      <div className='mt-5'>
      <button 
      onClick={handleSignIn}
      className="flex w-full justify-center rounded-md bg-blue-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login
      </button>

      </div>


      <p className="mt-7 text-center text-sm text-gray-500">
      Don't have an account? {''}
      <Link to="/sign-up"
      className="font-semibold leading-6 text-blue-4 hover:text-blue-3"
      >
        Sign up
      </Link>

      </p>
      
      <div>
        <Link to="/"> Back </Link>
      </div>
    </div>
  );
}
