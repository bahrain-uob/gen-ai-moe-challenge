'use client';


import CircularBar from './circularProgressBar';
import Button from './cardButton';

const resumeCard = ({
  title,
  percentage,
  testId
}: {
  title: string;
  percentage: number;
  testId: string
}) => {
  return (
    <div className="w-[20rem] h-72  bg-white rounded-lg shadow-lg flex flex-col items-center pt-6 ">
      <div className="w-full h-1/6 flex justify-center items-center">
        <h3 className="text-xl  text-center max-sm:text-lg">
          {title}
        </h3>
      </div>

      <div className="w-full h-4/6 flex justify-center items-center">
        <CircularBar percentage={percentage} circleWidth={110} radius={15}/>
      </div>

      <div className="w-full h-1/6 flex justify-center items-center pt-5 pb-20 px-6">
      <Button label="View Report" to={'/full-test/' + testId} />
      </div>
    </div>
  );
};

export default resumeCard;
