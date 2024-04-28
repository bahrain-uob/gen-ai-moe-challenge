import { Link } from 'react-router-dom';
const Home = () => (
  <main className="bg-[#FBF9F1]">
    <header className="absolute z-10 w-full">
      <nav className="flex justify-between items-center bg-[#3B828E] px-7 py-3">
        <Link to="">
          <img className="w-[100px]" src="assests/Logo.png" />
        </Link>

        <ul className="flex-1 flex px-12 gap-16 max-lg:hidden font-montserrat leading-normal text-2xl font-bold text-white">
          <Link to="">
            <li>Full Exams</li>
          </Link>
          <Link to="">
            <li>Section Exams</li>
          </Link>
          <Link to="">
            <li>Exercises</li>
          </Link>
        </ul>

        <Link to="">
          <img className="w-[55px] max-lg:hidden" src="assests/User.png" />
        </Link>
        <div className="hidden max-lg:block">
          <img src="assests/hamburger.svg" width={25} height={25} />
        </div>
      </nav>
    </header>
  </main>
);

export default Home;
