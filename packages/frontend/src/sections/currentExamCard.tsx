 import Progress from '../components/circularProgressBar';
import Button from '../components/FButton';

const currentExamCard = ({
  title,
  // remTime,
  startDate,
}: // timing,
{
  title: string;
  // remTime: string;
  startDate: string;
  // timing: string;
}) => {
  return (
    <div className="h-full w-2/4 bg-[#FEFDFA] rounded-xl flex flex-col items-center py-2 text-center shadow-md ">
      <div className="w-full flex justify-between items-start  px-5">
        <div className="flex flex-col items-start pt-10">
        <h3 className="text-4xl font-semibold md:text-3xl sm:text-xl">{title}</h3>
          <div className="flex flex-row mt-2">
            <h4 className="text-[#989896] ">Start Date :</h4>
            <h4 className="text-[#989896] ">{startDate}</h4>
          </div>
          <div className="pt-20 w-full flex flex-row items-start">
            <div className="mx-6">
              <Button label="Resume" tag="3B828E" />
            </div>
            <Button label="Start New" tag="3B828E" />
          </div>
        </div>
        <div className="hidden md:block sm:hidden">
            <Progress percentage={70} circleWidth={60} radius={27} />
          </div>
          <div className="block md:hidden">
            <Progress percentage={70} circleWidth={70} radius={32} />
          </div>
      </div>
    </div>
  );
};

export default currentExamCard;
