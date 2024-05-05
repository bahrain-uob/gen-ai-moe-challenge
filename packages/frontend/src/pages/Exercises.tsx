import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from '../components/TButton';
const Exercises = () => (
  <main className="bg-[#FBF9F1] h-screen">
    <Nav />
    <div className="py-32 flex">
      <Link to="">
        <Button label="Listening" />
      </Link>
      <Link to="">
        <Button label="Reading" />
      </Link>
      <Link to="/speakingExercises">
        <Button label="Speaking practcise" />
      </Link>
      <Link to="/writing-task1">
        <Button label="Writing Task 1" />
      </Link>
      <Link to="/writing-task2">
        <Button label="Writing Task 2" />
      </Link>
    </div>
  </main>
);

export default Exercises;
