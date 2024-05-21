import { BsChevronRight } from  'react-icons/bs';



export default function HowToUse(){

    return(

 
  <div className="flex flex-col justify-center mt-20 px-4 md:px-6 lg:px-8">


    <div className="w-full">

      <div className="container mx-auto  flex flex-col items-center gap-16">

        <div className="flex flex-col gap-16">

          <div className="flex flex-col gap-2 text-center">

            <h2
              className="mb-2 text-3xl font-extrabold leading-tight text-dark-grey-900 lg:text-4xl"
            >
              How Does Lingue Works?
            </h2>
           
          </div>
        </div>




        <div
          className="flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10 "
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-blue-4 bg-transparent text-dark-grey-600"
              
            >
              <span className="text-base text-blue-4 font-bold leading-7">1</span>
            </div>
            <div className="flex flex-col">
                
              <h3
                className="mb-2 text-base font-bold leading-tight text-dark-grey-900"
              >
                Create your Account
              </h3>


              <p >
               Sign up now and explore our comprehensive learning tools.
              </p>


            </div>
          </div>


          <div className="rotate-90 lg:rotate-0">
          <BsChevronRight className="h-8 w-8 text-dark-grey-600" /> 
          </div>

          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-blue-4 bg-transparent text-dark-grey-600"
            >
              <span className="text-base  text-blue-4 font-bold leading-7">2</span>
            </div>
            <div className="flex flex-col">
              <h3
                className="mb-2 text-base font-bold leading-tight text-dark-grey-900"
              >
                Take a placment exam 
              </h3>
              <p >
                Discover your strengths and areas for improvement.
              </p>
            </div>
          </div>

          <div className="rotate-90 lg:rotate-0">
          <BsChevronRight className="h-8 w-8 text-dark-grey-600" /> 
          </div>

          
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-solid border-blue-4 bg-transparent text-dark-grey-600"
            >
              <span className="text-base  text-blue-4 font-bold leading-7">3</span>
            </div>
            <div className="flex flex-col">
              <h3
                className="mb-2 text-base font-bold leading-tight text-dark-grey-900"
              >
                Start Learning
              </h3>
              <p >
              Practice through tailored exercises to master your skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div> );
 


}