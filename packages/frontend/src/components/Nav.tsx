import { useState } from 'react';
import { BsArrowRight, BsBoxArrowRight, BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const _linkStyling =
  'px-5 hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex items-center leading-normal ';
const _containerStyling =
  'flex flex-1 font-montserrat text-lg font-bold text-white ';

const Nav = () => {
  const linkStyling = _linkStyling + 'max-md:hidden ';

  return (
    <header className="z-10 w-full">
      <nav className="bg-blue-4 h-20">
        <div className={_containerStyling + 'h-full'}>
          <Link className={_linkStyling} to="">
            <img className="w-16" src="assets/Logo.png" />
          </Link>

          <Link className={linkStyling} to="/Full-Exam">
            <div>Full Exams</div>
          </Link>
          <Link className={linkStyling} to="/Sections">
            <div>Section Exams</div>
          </Link>
          <Link className={linkStyling} to="/Exercises">
            <div>Exercises</div>
          </Link>
          <Link className={linkStyling + 'ml-auto'} to="">
            <img className="w-11" src="assets/User.png" />
          </Link>

          <MobileMenu className={_linkStyling + 'md:hiddent ml-auto'} />
        </div>
      </nav>
    </header>
  );
};

const MobileMenu = ({ className = '' }) => {
  const linkStyling = _linkStyling + 'py-3 flex-row text-gray-700 ';

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(s => !s);

  return (
    <>
      <button className={className} onClick={() => toggleMenu()}>
        <BsList size="35" />
      </button>
      <div
        className={`
          h-screen bg-grey-1 fixed top-0 right-0 z-50 ${
            isOpen ? 'max-w-[40vw] ' : 'max-w-0'
          } transition-all duration-300 overflow-hidden`}
      >
        <div className={_containerStyling + 'flex-col w-[40vw] h-screen'}>
          <button className={linkStyling} onClick={() => toggleMenu()}>
            <span>Back</span>
            <BsArrowRight className="ml-auto" />
          </button>

          <Link className={linkStyling} to="/Full-Exam" onClick={toggleMenu}>
            <div>Full Exams</div>
          </Link>
          <Link className={linkStyling} to="/Sections" onClick={toggleMenu}>
            <div>Section Exams</div>
          </Link>
          <Link className={linkStyling} to="/Exercises" onClick={toggleMenu}>
            <div>Exercises</div>
          </Link>

          <button className={linkStyling + 'mt-auto'}>
            <span>Sign out</span>
            <BsBoxArrowRight className="ml-auto" />
          </button>
        </div>
      </div>
      <div
        className={`bg-black ${
          isOpen ? 'bg-opacity-55 z-20' : 'bg-opacity-0 -z-10'
        } h-screen w-screen fixed top-0 left-0 transition-all duration-300 ease-linear`}
      ></div>
    </>
  );
};

export default Nav;
