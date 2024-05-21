import { useContext, useEffect, useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('UOB');
  //TODO: make the institution list dynamic by fetching the list of institutions from the backend
  const authInfo = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleToastClose = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (authInfo.authSession !== undefined) {
      navigate('/home');
    }
  }, []);

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
        toast.success('Signed up successfully', {
          onClose: handleToastClose,
        });
      })
      .catch(e => toast.error(e.message))
      .finally(() => {
        authInfo.update();
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-grey-1">


    <div className="w-full flex justify-between items-center px-10 py-5 ">
     <h1 className="text-xl font-bold text-blue-4">LINGUI</h1>
     <Link to="/" className="text-xl text-blue-4">Home</Link>
   </div>

    
   <div className="flex flex-1 items-center justify-center px-20">
    <div className="w-full sm:max-w-[28rem] md:max-w-[28rem] lg:max-w-[31rem] flex flex-col justify-center px-6 py-10 lg:px-8 bg-white rounded-md shadow-lg">
        
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-4 mb-5 text-center text-3xl  font-roboto leading-9 tracking-tight text-gray-900">
          Sign up
        </h1>
      </div>

      <div className="mt-5">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>

        <div className="mt-2">
          <div className="signup">
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              className="block w-full rounded-md border border-blue-4 py-1.5 pl-4  "
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Password
          </label>

          <div className="relative mt-2 w-full">
            <input
              type={passwordShown ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value)}
              className="block w-full rounded-md border border-blue-4 py-1.5 pl-4 pr-10 "
            />
            {passwordShown ? (
              <BsEyeSlash
                onClick={togglePasswordVisiblity}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                size="35"
              />
            ) : (
              <BsEye
                onClick={togglePasswordVisiblity}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                size="35"
              />
            )}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900 ">
              Institution
            </label>
          </div>
          <div className="mt-2">
            <select
              onChange={e => setInstitution(e.target.value)}
              className="block w-full rounded-md border border-blue-4 py-1.5 px-4  "
            >
              <option value="UOB">UOB</option>
              <option value="Polytechnic">Polytechnic</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <button
            onClick={signUpHandler}
            className="flex w-full justify-center rounded-md bg-blue-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account? {''}
          <Link
            to="/sign-in"
            className="font-semibold leading-6 text-blue-4 hover:text-blue-3"
          >
            Sign in
          </Link>
        </p>
      </div>
      
    </div>
    </div>
    </div>
  );
}
