import { useState } from 'react';
import { BsArrowRightCircleFill, BsList } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const linkStyling =
  'px-5 hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex items-center leading-normal ';
const containerStyling =
  'flex flex-1 font-montserrat text-lg font-bold text-white ';

const Nav = () => {
  return (
    <header className="z-10 w-full">
      <nav className="bg-blue-4 h-20">
        <div className={containerStyling + 'h-full'}>
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

          <MobileMenu className={linkStyling + 'md:hiddent ml-auto'} />
        </div>
      </nav>
    </header>
  );
};

const MobileMenu = ({ className = '' }) => {
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
        <div className={containerStyling + 'flex-col w-[40vw]'}>
          <button
            className={linkStyling + 'py-3 flex-row text-gray-700'}
            onClick={() => toggleMenu()}
          >
            <BsArrowRightCircleFill className="mr-3" />
            <span>Back</span>
          </button>
          <button className={linkStyling + 'py-3 flex-row text-gray-700'}>
            <span>Sign out</span>
          </button>
        </div>
      </div>
      <div
        className={`bg-black ${
          isOpen ? 'bg-opacity-55 z-20' : 'bg-opacity-0 -z-10'
        } h-screen w-screen fixed top-0 left-0 transition-all duration-300`}
      ></div>
    </>
  );
};

export default Nav;
