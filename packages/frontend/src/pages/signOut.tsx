import { signOut } from 'aws-amplify/auth';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export function SignOutPage() {
  const navigate = useNavigate();
  const authInfo = useContext(AuthContext);

  signOut()
    .then(() => {
      console.log('Signed out successfully');
    })
    .catch(error => {
      console.log('error signing out: ', error);
    })
    .finally(() => {
      authInfo.update();
      navigate('/');
    });

  return <></>;
}
