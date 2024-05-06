import Nav from './components/landingNav';
import Describe from './sections/toolDescribe';
import Features from './sections/features';
import './index.css';
import { signOut } from 'aws-amplify/auth';

const App = () => {
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
    <main>
      <Nav />
      <section className="px-10 py-12">
        <Describe />

        <div className="pt-16 flex flex-col justify-start pl-3">
          <h3 className="text-[65px] font-extrabold text-[#363534] max-sm:text-[40px]">
            Features
          </h3>
          <div className="w-2/5 h-3 bg-[#74ACB5]"></div>
        </div>

        <section className="py-12">
          <Features />
        </section>

        <button onClick={signOutHandler}> Sign out </button>
      </section>
    </main>
  );
};

export default App;
