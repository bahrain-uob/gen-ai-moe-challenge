import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <header className="z-10 w-full">
      <nav className="flex justify-between items-center bg-[#3B828E] px-7 py-3">
        <Link to="/home">
          <img className="w-[100px]" src="assets/Logo.png" />
        </Link>

        <ul className="flex-1 flex px-12 gap-16 max-lg:hidden font-montserrat leading-normal text-2xl font-bold text-white">
          <Link to="/Full-Exam">
            <li>Full Exams</li>
          </Link>
          <Link to="/Sections">
            <li>Section Exams</li>
          </Link>
          <Link to="">
            <li>Exercises</li>
          </Link>
        </ul>

        <Link to="">
          <img className="w-[55px] max-lg:hidden" src="assets/User.png" />
        </Link>
        <div className="hidden max-lg:block">
          <img src="assets/hamburger.svg" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
