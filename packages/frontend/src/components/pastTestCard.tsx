import { getRelativeTime } from '../utilities';
import Button from '../components/cardButton';
import { testType } from '../../../functions/src/utilities/fullTestUtilities';

const getColor = (grade: number): string => {
  if (grade < 5.5) {
    return '#D90000';
  } else if (grade > 7) {
    return '#1F9362';
  } else {
    return '#E99A00'; // Default color
  }
};

const pastTestCard = ({
  grade,
  testId,
  type,
}: {
  grade: number;
  testId: string;
  type: testType | 'full';
}) => {
  const color = getColor(grade);

  return (
    <div className=" w-[20rem] h-72  bg-white rounded-lg shadow-lg flex flex-col items-center pt-6  ">
      <h3 className="text-xl  text-center max-sm:text-lg">
        {'IELTS - ' + type.charAt(0).toUpperCase() + type.slice(1) + ' Test'}
      </h3>
      <div className="w-full h-1/3 flex justify-center items-center pt-10">
        <h3 className="text-3xl  text-gray-500  ">
          <span
            className={`text-5xl `}
            style={{ color: color }}
          >
            {grade}
          </span>{' '}
          / 9
        </h3>
      </div>

      <div className="w-full h-1/3 flex pt-12 justify-center items-center">
        <Button label="View Report" to={'/feedback/' + testId} />{' '}
      </div>

      <div className="w-full h-1/3 flex flex-col  max-md:text-base">
        <div className="w-full h-full flex flex-row  pl-2 pt-9">
          <h3 className="text-[#989896] text-sm">
            Submitted {getRelativeTime(testId)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default pastTestCard;
