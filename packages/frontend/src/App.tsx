import Describe from './sections/toolDescribe';
import Features from './sections/features';
import About from './sections/About';
import './index.css';
import HowToUse from './sections/HowToUse';


const App = () => {
  return (
    <>
      <section className="xl:padding-1 wide:padding-r">
        <Describe />

        <div className="pt-20 flex flex-col justify-start pl-3">
        <h3 className="text-[40px] font-semibold text-[#363534] max-sm:text-[30px] ">
        Features
        </h3>

          
        </div>

        <section >
          <Features />
        </section>

        <div className="border-t border-gray-300 w-full  my-10"/>

        <section  id="HowToUse">
          <HowToUse />
        </section>

        <div className="border-t border-gray-300 w-full my-20"/>

        <section >
          <About />
        </section>

       

      
      </section>
    </>
  );
};

export default App;
