import { Link } from 'react-router-dom';
import Button from '../components/TButton';

const sections = () => (
  <>
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
