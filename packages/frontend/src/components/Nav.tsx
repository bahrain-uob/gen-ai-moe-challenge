import { BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Nav = () => {
  const linkStyling =
    'px-5 hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex items-center leading-normal ';

  return (
    <header className="z-10 w-full">
      <nav className="bg-blue-4 h-20">
        <div className="flex flex-1 h-full font-montserrat text-lg font-bold text-white">
          <Link className={linkStyling} to="">
            <img className="w-16" src="assets/Logo.png" />
          </Link>

          <Link className={linkStyling + 'max-md:hidden'} to="/Full-Exam">
            <div>Full Exams</div>
          </Link>
          <Link className={linkStyling + 'max-md:hidden'} to="/Sections">
            <div>Section Exams</div>
          </Link>
          <Link className={linkStyling + 'max-md:hidden'} to="/Exercises">
            <div>Exercises</div>
          </Link>
          <Link className={linkStyling + 'max-md:hidden ml-auto'} to="">
            <img className="w-11" src="assets/User.png" />
          </Link>

          <Link className={linkStyling + 'md:hidden ml-auto'} to="">
            <BsList size="35" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
