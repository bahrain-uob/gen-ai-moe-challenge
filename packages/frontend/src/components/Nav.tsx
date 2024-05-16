import React, { useState } from 'react';
import {
  BsArrowRight,
  BsBoxArrowRight,
  BsList,
  BsPersonCircle,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import type { To } from 'react-router-dom';

type NavProps = {
  showLogo?: boolean;
  entries?: Entry[];
};
type Entry = { text: string; to: To };

// Common styles
const _linkStyling =
  'px-5 hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex items-center leading-normal ';
const _containerStyling =
  'flex flex-1 font-montserrat text-md font-bold text-white ';

export const Nav: React.FC<NavProps> = props => {
  const { showLogo = true, entries = [] } = props;

  // Hide on mobile
  const linkStyling = _linkStyling + 'max-md:hidden ';

  const logo = showLogo ? (
    <Link className={_linkStyling} to="">
      <img className="w-12" src="assets/Logo.png" />
    </Link>
  ) : null;

  const links = entries.map(({ text, to }, index) => (
    <Link className={linkStyling} to={to} key={index}>
      <div>{text}</div>
    </Link>
  ));

  return (
    <header className="z-10 w-full">
      <nav className="bg-blue-4 h-14">
        <div className={_containerStyling + 'h-full'}>
          {logo}
          {links}
          <ProfileMenu className={linkStyling + 'ml-auto'} />

          <MobileMenu
            className={_linkStyling + 'md:hidden ml-auto'}
            entries={entries}
          />
        </div>
      </nav>
    </header>
  );
};

const MobileMenu = ({
  className = '',
  entries,
}: {
  className: string;
  entries: Entry[];
}) => {
  const linkStyling = _linkStyling + 'py-3 flex-row text-gray-700 ';

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(s => !s);

  const links = entries.map(({ text, to }, index) => (
    <button key={index} onClick={toggleMenu}>
      <Link className={linkStyling} to={to}>
        <div>{text}</div>
      </Link>
    </button>
  ));

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

          {links}

          {/* TODO: change sign or sign out based on whether the user login */}
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

const ProfileMenu = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(s => !s);

  // Same as mobile menu
  const linkStyling = _linkStyling + 'py-3 flex-row text-gray-700 ';

  const menuContent = (
    <>
      <Link className={linkStyling} to="">
        <div>Example</div>
      </Link>
      <Link className={linkStyling} to="">
        <div>Example</div>
      </Link>
    </>
  );

  return (
    <>
      <span className={className + ' relative'}>
        <button onClick={() => toggleMenu()}>
          <BsPersonCircle size="28" />
        </button>
        <div
          className={`fixed right-10 top-10 w-48 bg-grey-3 shadow-2xl rounded-lg ${
            isOpen ? 'opacity-100 z-20' : 'opacity-0 -z-10'
          } transition-all duration-300 flex flex-col`}
        >
          {menuContent}
        </div>
      </span>
    </>
  );
};
