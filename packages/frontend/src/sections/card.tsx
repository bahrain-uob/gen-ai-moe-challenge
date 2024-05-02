import { Link } from 'react-router-dom';
import Button from '../components/FButton';

const card = () => {
  return (
    <section className="w-3/5 flex max-container bg-[#619AA2] rounded-md py-5">


        <form className='w-full flex justify-center'>
        <div className="flex flex-col gap-10 w-full justify-center items-center">

            <div className='flex justify-center'>
                <h3 className='text-white font-bold text-6xl pt-8 pb-12'>Sign In</h3>
            </div>

            <div className=' flex flex-col justify-center'>
                <div className='flex flex-col w-full'>
                    <label className='text-white font-semibold text-3xl'>Email</label>
                    <input className='w-1/2'></input>
                </div>
                
                <div className='flex flex-col w-full'>
                    <label className='text-white font-semibold text-3xl'>Password</label>
                    <input className='w-1/2'></input>
                </div>
            </div>
                <label className='text-white text-xl pl-1'><input type='checkbox'></input> Remember Me</label>
                <Link to="/home"><div className='pt-6'><Button label='Sign In'/></div></Link>
                <p className='text-white text-decoration-line: underline'>Forget Password?</p>

            
            
        </div>

        </form>
    </section>
  )
}

export default card