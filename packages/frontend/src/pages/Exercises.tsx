import { Link } from 'react-router-dom';
import Button from '../components/TButton';

const Exercises = () => (
  <div className="flex">
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
    <Link to="/VocabularyPracticePage">
      <Button label="Vocabulary Practice" />
    </Link>
  </div>
);

export default Exercises;
