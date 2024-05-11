import Describe from './sections/toolDescribe';
import Features from './sections/features';
import './index.css';
import { Link } from 'react-router-dom';
import Nav from './components/landingNav';

const App = () => {
  return (
    <>
      <main className="bg-grey-1">
        <section>
          <Nav />
        </section>
        <section className="xl:padding-1 wide:padding-r">
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

          <Link to="sign-out">
            <button> Sign out </button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default App;
