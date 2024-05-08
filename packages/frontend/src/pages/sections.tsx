import { Link } from 'react-router-dom';
import Button from '../components/TButton';

const sections = () => (
  <>
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
      <Link to="/writing-task1">
        <Button label="Writing Task 1" />
      </Link>
      <Link to="/writing-task2">
        <Button label="Writing Task 2" />
      </Link>
    </div>
  </>
);

export default sections;
