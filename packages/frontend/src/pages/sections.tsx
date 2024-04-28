import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Button from '../components/TButton';
const sections = () => (
  <main className="bg-[#FBF9F1] h-full">
    <Nav/>
    <div className='py-32 flex'>
      <Button label='Listening'/>
      <Button label='Reading'/>
      <Button label='Speaking'/>
      <Button label='Writing'/>
    </div>
  </main>
);

export default sections;
