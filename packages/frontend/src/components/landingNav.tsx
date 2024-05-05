import { Link } from 'react-router-dom';
import '../index.css';

const landingNav = () => {
  const tmp =
    'px-5 hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex items-center leading-normal ';

  return (
    <header className="z-10 w-full">
      <nav className="bg-[#3B828E] h-20">
        <div className="flex flex-1 h-full font-montserrat text-lg font-bold text-white">
          <Link className={tmp} to="">
            <img className="w-16" src="assets/Logo.png" />
          </Link>

          <Link className={tmp + 'max-md:hidden'} to="">
            <div>About</div>
          </Link>
          <Link className={tmp + 'max-md:hidden'} to="">
            <div>How to use</div>
          </Link>
          <Link className={tmp + 'max-md:hidden ml-auto'} to="">
            <div>Sign in</div>
          </Link>

          <Link className={tmp + 'md:hidden ml-auto'} to="">
            <img className="w-6" src="assets/hamburger.svg" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default landingNav;
