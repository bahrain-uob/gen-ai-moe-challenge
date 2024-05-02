import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from '../components/TButton';
const sections = () => (
  <main className="bg-[#FBF9F1] h-screen">
    <Nav />
    <div className="py-32">
      <h4 className="text-xl mb-4"> Better pages </h4>
      <div className="flex">
        <Link to="/_writing-task2">
          <Button label="Writing Task 2" />
        </Link>
      </div>
      <h4 className="text-xl mb-4"> Dummy pages </h4>
      <div className="flex">
        <Link to="">
          <Button label="Listening" />
        </Link>
        <Link to="">
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
    </div>
  </main>
);

export default sections;
