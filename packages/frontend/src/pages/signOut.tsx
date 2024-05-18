import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export function SignOutPage() {
  const navigate = useNavigate();

  signOut()
    .then(() => {
      console.log('Signed out successfully');
    })
    .catch(error => {
      console.log('error signing out: ', error);
    })
    .finally(() => navigate('/'));

  return <></>;
}
