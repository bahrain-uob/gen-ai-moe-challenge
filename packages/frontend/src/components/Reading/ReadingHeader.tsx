
import CountdownTimer from '../CountdownTimer'; // Assuming CountdownTimer is the name of your countdown timer component

interface ExamsHeaderProps {
  duration: number; // Duration of the exam in minutes
  section: string;
}

export default function Exams({ duration, section }: ExamsHeaderProps) {


  return (
    <div className='bg-blue-4 flex justify-between items-center'>
      <div>
        <h2 className='text-1xl text-white  font-bold ml-5'>{section}</h2>
      </div>  
      <div >
        <CountdownTimer minutes={duration}  />
      </div>
      
    </div>
  );
}
