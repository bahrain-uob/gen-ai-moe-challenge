import { Link } from 'react-router-dom';
import Button from '../components/TButton';

const toolDescribe = () => {
  return (
    <section className="w-full flex-1 flex flex-col lg:flex-row pt-16 gap-10 max-container justify-center lg:gap-56 pb-0">
      <div className="relative flex justify-center items-center">
        <img src="assets/Rising.png" className="lg:w-96" />
      </div>

      <div className="relative xl:w-2/4 flex flex-col justify-center items-center w-full max-xl:padding-x pt-27 ">
        <h1 className="text-2xl font-bold text-center font-montserrat pb-10 lg:text-4xl">
          Get your{' '}
          <span className="text-[#908C87] font-extrabold">English</span> level
          up by practicing set of
          <br />
          Exams and Exercises
        </h1>
        <Link to="/Home">
          <Button label="Get Started" />
        </Link>
      </div>
    </section>
  );
};

export default toolDescribe;
