import Nav from "./components/landingNav";
import Describe from './sections/toolDescribe';
import Features from './sections/features';

const Landing = () => (
  <main>
    <Nav/>
    <section className="xl:padding-1 wide:padding-r">
      <Describe/>
    </section>
    <div className='lg:pt-32 flex flex-col justify-start'>
      <h3 className='text-[65px] font-extrabold text-[#363534]'>Features</h3>
      <div className='w-2/5 h-3 bg-[#FFFFFF]'></div>
    </div>
    
    <section className="padding">
      <Features/>
    </section>
  </main>
  
);


export default Landing