import ResumeCard from '../components/resumeCard';

const continuePast = () => {
  return (
    <section className="h-full pb-8">
      <div className="w-full h-1/6 px-4 pb-8">
        <div className="h-2/3 w-full">
        <h3 className="text-4xl text-[#363534] max-lg:text-3xl font-bold mb-6 mx-6">
          Continue
        </h3>

        </div>
       
      </div>

      
      <div className="w-full flex flex-row flex-wrap justify-around px-12 gap-x-6 gap-y-12 max-[972px]:justify-center max-md:px-4 max-md:gap-x-4 max-md:gap-y-6">
        <ResumeCard title="IELTS - Speaking Section Test" percentage={50} />
        <ResumeCard title="IELTS - Reading Section Test" percentage={39} />
        <ResumeCard title="IELTS - Full Test" percentage={30} />
        <ResumeCard title="IELTS - Writing Section Test" percentage={10} />
      </div>
    </section>
  );
};

export default continuePast;
