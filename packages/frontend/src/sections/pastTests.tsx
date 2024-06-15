import {
  previousTests,
  testType,
} from '../../../functions/src/utilities/fullTestUtilities';
import Card from '../components/pastTestCard';

const pastTests = ({
  previousTests,
  type,
}: {
  previousTests: previousTests;
  type: testType | 'full';
}) => {
  const rendered = previousTests.reverse().map((test, index) => {
    console.log(test);
    return (
      <Card grade={test.score} testId={test.testId} key={index} type={type} />
    );
  });

  return (
    <section className="h-full pb-6">
      <div className="w-full h-1/6 px-4 pb-8">
        <div className="h-2/3 w-full">
          <h3 className="text-4xl text-[#363534] max-lg:text-3xl font-bold mb-6 mx-2 mt-">
            Past Tests
          </h3>
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap justify-around mx-4 gap-x-3 gap-y-12 max-[972px]:justify-center max-md:px-4 max-md:gap-x-4 max-md:gap-y-6">
        {previousTests.length > 0 ? (
          rendered
        ) : (
          <h3 className="text-4xl font-bold ">No previous tests</h3>
        )}
      </div>
    </section>
  );
};

export default pastTests;
