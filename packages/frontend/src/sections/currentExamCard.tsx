 import Progress from '../components/circularProgressBar';
import Button from '../components/cardButton';

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
    <div className="h-full lg:w-2/4 md:w-3/4 sm:w-3/4 bg-[#FEFDFA] rounded-xl flex flex-col items-center py-2 text-center shadow-md ">
      <div className="w-full flex justify-between items-start  px-5">
        <div className="flex flex-col items-start pt-10">
        <h3 className="lg:text-4xl font-semibold md:text-3xl text-2xl ">{title}</h3>
          <div className="flex flex-row mt-2 ">
            <h4 className="text-[#989896] lg:text-md md:text-sm text-xs">Start Date :</h4>
            <h4 className="text-[#989896] lg:text-md md:text-sm text-xs">{startDate}</h4>
          </div>
          <div className="pt-20 w-full flex flex-row items-start mb-7">
            <div className="mr-3">
              <Button label="Resume" size='large'   />
            </div>
            <Button label="Start New" size='large' noBackground />
          </div>
        </div>
        <div className="hidden lg:block md:hidden">
            <Progress percentage={70} circleWidth={60} radius={27} percentageFontSize='0.8rem' />
          </div>
          <div className="block md:hidden">
            <Progress percentage={70} circleWidth={70} radius={30}  percentageFontSize='0.8rem' />
          </div>
      </div>
    </div>
  );
};

export default currentExamCard;
