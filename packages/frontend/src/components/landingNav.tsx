import { Link } from 'react-router-dom';
import '../index.css';

const landingNav = () => {
  return (
    <header className="z-10 w-full">
      <nav className="flex justify-between items-center bg-[#3B828E] px-7 py-3">
        <Link to="">
          <img className="w-[100px]" src="assets/Logo.png" />
        </Link>

        <ul className="flex-1 flex px-12 gap-16 max-lg:hidden font-montserrat leading-normal text-2xl font-bold text-white">
          <Link to="">
            <li>About</li>
          </Link>
          <Link to="">
            <li>How to use</li>
          </Link>
        </ul>

        <Link to="/sign-in">
          <p className="max-lg:hidden font-montserrat leading-normal text-2xl font-bold text-white">
            Sign In
          </p>
        </Link>
        <div className="hidden max-lg:block">
          <img src="assets/hamburger.svg" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default landingNav;
