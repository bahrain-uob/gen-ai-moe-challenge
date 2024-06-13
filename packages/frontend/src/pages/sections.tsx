import { Link } from 'react-router-dom';
import Button from '../components/TButton';
import { setCachedFeedback } from '../utilities';
import { sampleFullTest } from '../utilities/sampleFullTest';

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
      <Link to="/listening/1">
        <Button label="Listening" />
      </Link>
      <Link to="/reading/2">
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
    <Link
      to="/feedback/1717941628284-sample"
      onClick={() =>
        setCachedFeedback({ fullItem: sampleFullTest }, '1717941628284-sample')
      }
    >
      <Button label="Sample Feedback" />
    </Link>
    <Link to="/challengePage">
      <Button label="Sample Challenge" />
    </Link>
  </>
);

export default sections;
