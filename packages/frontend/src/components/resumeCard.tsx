'use client';

import CircularBar from './circularProgressBar';
import Button from './cardButton';

const ResumeCard = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
  return (
    <div className="w-[20rem] h-72  bg-white rounded-lg shadow-lg flex flex-col items-center pt-6 ">
      <div className="w-full h-1/6 flex justify-center items-center">
        <h3 className="text-xl  text-center max-sm:text-lg">{title}</h3>
      </div>

      <div className="w-full h-4/6 flex justify-center items-center">
        <CircularBar percentage={percentage} circleWidth={110} radius={15} />
      </div>

      <div className="w-full h-1/6 flex justify-center items-center pt-5 pb-20 px-6">
        <Button label="Resume" size="small"></Button>
      </div>
    </div>
  );
};

export default ResumeCard;
