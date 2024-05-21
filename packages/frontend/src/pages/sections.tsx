import { Link } from 'react-router-dom';
import Button from '../components/TButton';

const sections = () => (
  <>
    <main className="w-full h-full flex justify-center flex-col items-center">
      <div className="w-1/2 h-1/2 flex flex-col items-center mb-32 max-sm:w-full">
        <h1 className="text-5xl font-bold max-sm:text-4xl">Section Exam</h1>
      </div>
      <div className="w-3/4 pl-4 pb-2 max-sm:w-full">
        <h2 className="font-semibold text-grey-4">
          Choose a Section to Practice on
        </h2>
      </div>
      <div className="w-3/4 rounded-xl bg-white flex flex-wrap shadow-lg max-sm:flex-col max-sm:w-full">
        <Link to="">
          <div className="w-1/2 flex flex-row justify-center items-center gap-x-10 p-12 border-2 rounded-tl-xl max-sm:w-full max-sm:rounded-t-xl">
            <img src="assets/Listening.png" className="w-24 max-sm:w-16" />
            <h1 className="font-semibold text-2xl">Listening</h1>
          </div>
        </Link>
        <Link to="">
          <div className="w-1/2 flex flex-row justify-center items-center gap-x-10 p-12 border-2 rounded-tr-xl max-sm:w-full max-sm:rounded-none">
            <img src="assets/Speaking.png" className=" w-24 max-sm:w-16" />
            <h1 className="font-semibold text-2xl">Speaking</h1>
          </div>
        </Link>
        <Link to="">
          <div className="w-1/2 flex flex-row justify-center items-center gap-x-10 p-12 border-2 rounded-bl-xl max-sm:w-full max-sm:rounded-none">
            <img src="assets/Reading.png" className=" w-24 max-sm:w-16" />
            <h1 className="font-semibold text-2xl">Reading</h1>
          </div>
        </Link>
        <Link to="">
          <div className="w-1/2 flex flex-row justify-center items-center gap-x-10 p-12 border-2 rounded-br-xl max-sm:w-full max-sm:rounded-b-xl">
            <img src="assets/Writing.png" className=" w-24 max-sm:w-16" />
            <h1 className="font-semibold text-2xl">Writing</h1>
          </div>
        </Link>
      </div>
    </main>
    <div className="hidden">
      <h4 className="text-xl mb-4"> Better pages </h4>
      <div className="flex">
        <Link to="/_writing-task1">
          <Button label="Writing Task 1" />
        </Link>
        <Link to="/_writing-task2">
          <Button label="Writing Task 2" />
        </Link>
      </div>
      <h4 className="text-xl mb-4"> Dummy pages </h4>
      <div className="flex">
        <Link to="">
          <Button label="Listening" />
        </Link>
        <Link to="/reading/1">
          <Button label="Reading" />
        </Link>
        <Link to="/speaking">
          <Button label="Speaking" />
        </Link>
      </div>
      <div className="flex mt-6">
        <Link to="/test-speaking-audio-ui">
          <Button label="Speaking Audio UI" />
        </Link>
        <Link to="/test-speaking-card-ui">
          <Button label="Speaking Card UI" />
        </Link>
      </div>
      <Link to="/test">
        <Button label="/test" />
      </Link>
      <Link to="/full-test">
        <Button label="full test" />
      </Link>
    </div>
  </>
);

export default sections;
