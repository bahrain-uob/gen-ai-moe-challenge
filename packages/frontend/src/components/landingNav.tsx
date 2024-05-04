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

          <Link className={tmp} to="">
            <div>About</div>
          </Link>
          <Link className={tmp} to="">
            <div>How to use</div>
          </Link>
          <Link className={tmp + 'ml-auto'} to="">
            <div>Sign in</div>
          </Link>
        </div>
        <div className="hidden max-lg:block">
          <img src="assets/hamburger.svg" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default landingNav;
