import React, { useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';

export default function CollapsableCard({
  title,
  children,
}: {
  title: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <>
      <div className="shadow-lg rounded-xl mb-1">
        <button
          className={`w-full p-3 text-left bg-gray-200  
                     ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}
                     flex flex-row justify-between items-center
                     hover:bg-gray-300 transition-all duration-300`}
          onClick={toggle}
        >
          <span>{title}</span>
          {/* <BsArrowDownCircleFill */}
          <BsCaretDownFill
            className={`h-full transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } transition-transform duration-300`}
          />
          {/* <span
            className={`float-right transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            } transition-transform duration-300`}
          ></span> */}
        </button>
        <div
          className={`bg-white overflow-hidden ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          } transition-all duration-500 rounded-b-xl`}
        >
          <div className="p-4">{children}</div>
        </div>
      </div>
      <br />
    </>
  );
}
