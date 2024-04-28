import { Link } from 'react-router-dom';
const sections = () => (
  <main className="bg-[#FBF9F1] h-full">
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

    <section>
      <section className="w-full flex-1 flex flex-col lg:flex-row pt-16 gap-10 max-container justify-center lg:gap-56 pb-0">
        <div className="xl:w-2/4 flex flex-row gap-10 justify-center items-center w-full max-xl:padding-x pt-32 ">
          <button
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  
                        bg-[#575553] text-white border-[#575553]"
          >
            Listening
          </button>
          <button
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  
                        bg-[#575553] text-white border-[#575553]"
          >
            Reading
          </button>
          <button
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  
                        bg-[#575553] text-white border-[#575553]"
          >
            Speaking
          </button>
          <button
            className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  
                        bg-[#575553] text-white border-[#575553]"
          >
            Writing
          </button>
        </div>
      </section>
    </section>
  </main>
);

export default sections;
