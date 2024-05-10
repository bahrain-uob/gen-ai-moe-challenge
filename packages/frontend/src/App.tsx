import Nav from './components/landingNav';
import Describe from './sections/toolDescribe';
import Features from './sections/features';
import './index.css';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <Nav />
      <section className="xl:padding-1 wide:padding-r">
        <Describe />
      </section>
      <div className="lg:pt-32 flex flex-col justify-start pl-3 max-sm:pt-20">
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
    </main>
  );
};

export default App;
