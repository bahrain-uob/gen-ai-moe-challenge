import { previousTests } from '../../../functions/src/utilities/fullTestUtilities';
import Card from '../components/pastTestCard';
import { getRelativeTime } from '../utilities';

const pastTests = ({ previousTests }: { previousTests: previousTests }) => {
  const rendered = previousTests.reverse().map((test, index) => {
    console.log(test);
    return (
      <Card
        grade={test.score}
        startTime={getRelativeTime(test.testId)}
        key={index}
      />
    );
  });

  return (
    <section className="h-full pb-6">
      <div className="w-full h-1/6 px-4 pb-8">
        <div className="h-2/3 w-full">
          <h3 className="text-[65px] font-extrabold text-[#363534] max-lg:text-[55px]">
            Past Tests
          </h3>
        </div>
        <div className="h-2/3 w-full">
          <div className="h-3 w-4/12 bg-[#74ACB5] max-md:w-10/12"></div>
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-5 justify-between px-32 gap-y-9 max-[972px]:justify-center max-xl:px-7">
        {previousTests.length > 0 ? (
          rendered
        ) : (
          <h3 className="text-4xl font-bold">No previous tests</h3>
        )}
      </div>
    </section>
  );
};

export default pastTests;
