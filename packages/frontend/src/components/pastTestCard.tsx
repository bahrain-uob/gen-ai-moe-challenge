import Button from '../components/FButton';

const getColor = (grade: number): string => {
    if (grade < 5.5) {
        return 'D90000';
    } else if (grade > 7) {
        return '1F9362';
    } else {
        return 'E99A00'; // Default color
    }
};

const pastTestCard = ({grade,time,submitTime}:{grade:number,time:string,submitTime:string}) => {
    const color = getColor(grade);
    

  return (
    <div className=" w-[28rem] h-96 bg-white rounded-lg hover:w-[30rem] hover:h-[26rem] duration-500">
      <div className="w-full h-1/3 flex justify-center items-center">
      <h3 className='text-5xl font-semibold'><span className={`text-7xl font-bold text-[#${color}]`}>{grade}</span> / 9</h3>
      </div>
      <div className="w-full h-1/3 flex flex-col pt-8 text-2xl max-md:text-base">
        <div className='w-full h-full flex flex-row justify-around pl-4 font-semibold'>
            <h3>Time</h3>
            <h3>{time}</h3>
        </div>
        <div className='w-full h-full flex flex-row justify-around pl-4 font-semibold'>
            <h3>Submitted On</h3>
            <h3>{submitTime}</h3>
        </div>
      </div>
      <div className="w-full h-1/3 flex justify-center items-center"><Button label='View Report' tag='3B828E'/></div>
    </div>
  )
}

export default pastTestCard