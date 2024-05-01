import Progress from '../components/circularProgressBar';
import Button from '../components/FButton'

const currentExamCard = ({title,remTime,startDate,timing}:{title:string,remTime:string,startDate:string,timing:string}) => {
  return (
    <div className=" h-full w-3/4 bg-[#FEFDFA] rounded-xl flex flex-col items-center">

        <div className=" h-1/6 w-full flex items-center justify-center">
            <h3 className="text-4xl font-bold">{title}</h3>
        </div>
        <div className=" h-3/6 w-full flex justify-center items-center">
            <Progress percentage={50} circleWidth={370}/>
        </div>
        <div className=" h-1/6 w-full flex">
            <div className='h-full w-2/6 flex flex-col justify-center gap-y-5 p-6 font-medium'>
                <h4 className='text-[#989896] text-3xl'>{timing}</h4>
                <h4 className='text-[#989896] text-3xl'>Start Date</h4>
            </div>
            <div className='h-full w-4/6 flex flex-col justify-center gap-y-5 p-3 font-bold'>
                <h4 className='text-3xl'>{remTime}</h4>
                <h4 className='text-3xl'>{startDate}</h4>            
            </div>
        </div>
        <div className="pt-9 w-1/2 flex gap-x-20">
            <Button label='Resume' tag='3B828E'/>
            <Button label='Start Over' tag='3B828E'/>
        </div>
        
    </div>
  )
}

export default currentExamCard