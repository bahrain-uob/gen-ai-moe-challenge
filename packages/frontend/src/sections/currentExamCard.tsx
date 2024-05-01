import Progress from '../components/circularProgressBar';
import Button from '../components/FButton'

const currentExamCard = ({title,remTime,startDate,timing}:{title:string,remTime:string,startDate:string,timing:string}) => {
  return (
    <div className=" h-full w-3/4 bg-[#FEFDFA] rounded-xl flex flex-col items-center py-5 text-center">

        <div className=" h-1/6 w-full flex items-center justify-center">
            <h3 className="text-4xl font-bold">{title}</h3>
        </div>
        <div className=" h-3/6 w-full flex justify-center items-center">
            <Progress percentage={50} circleWidth={370}/>
        </div>
        <div className=" h-1/6 w-full flex flex-col text-3xl max-md:text-xl max-sm:text-sm">
            <div className='h-full w-full flex flex-row justify-around p-6'>
                <h4 className='text-[#989896] font-medium'>{timing}</h4>
                <h4 className='font-bold'>{remTime}</h4>
            </div>
            <div className='h-full w-full flex flex-row justify-around gap-x-11 p-6'>
                <h4 className='text-[#989896] font-medium'>Start Date</h4>
                <h4 className='font-bold'>{startDate}</h4>            
            </div>
        </div>
        <div className="pt-9 w-1/2 flex gap-x-20 max-sm:gap-x-5">
            <Button label='Resume' tag='3B828E'/>
            <Button label='Start Over' tag='3B828E'/>
        </div>
        
    </div>
  )
}

export default currentExamCard