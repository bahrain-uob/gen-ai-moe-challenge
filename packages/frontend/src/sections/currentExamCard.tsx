import Progress from '../components/circularProgressBar';
import Button from '../components/cardButton';

const currentExamCard = ({
  title,
  startDate,
  progress,
  testId,
}: {
  title: string;
  startDate: string;
  progress: number;
  testId: string;
}) => {
  return (
    <div className="h-full lg:w-2/4 md:w-3/4 sm:w-3/4 bg-[#FEFDFA] rounded-xl flex flex-col items-center py-2 text-center shadow-md ">
      <div className="w-full flex justify-between items-start  px-5">
        <div className="flex flex-col items-start pt-10">
          <h3 className="lg:text-4xl font-semibold md:text-3xl text-2xl ">
            {title}
          </h3>
          <div className="flex flex-row mt-2 ">
            <h4 className="text-[#989896] lg:text-md md:text-sm text-xs">
              Start Date: {startDate}
            </h4>
          </div>
          <div className="pt-20 w-full flex flex-row items-start mb-7">
            <div className="mr-3">
              <Button label="Resume" size="large" to={'/' + testId} />
              {/* TODO: navigate to the correct test page */}
            </div>
            {/* <Button label="Start New" size="large" noBackground /> */}
            {/* For now we don't have the feature to start a new exam when one is in progress */}
          </div>
        </div>
        <div className="h-full">
          <Progress
            percentage={progress}
            circleWidth={60}
            radius={27}
            percentageFontSize="0.8rem"
          />
        </div>
      </div>
    </div>
  );
};

export default currentExamCard;
