export default function About(){
return(
<div className="mt-10" >

    <section 
        className="relative block px-6 py-10 md:py-20 md:px-10   ">


        <div className="relative mx-auto max-w-5xl text-center ">
            
            <h2
                className="block w-full text-blue-4 bg-clip-text font-bold  text-3xl sm:text-4xl">
               About
            </h2>
            <p
                className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
                We are a startup that focuses on improving English language proficiency by offering personalized
                real-time practice and evaluation using GenAI. English training platforms lack immediate feedback,
                essential features like speaking and writing, a personalized training plan with progress tracking and
                might not provide an engaging experience. 
            </p>
        </div>


        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">


            
            <div className="rounded-md border bg-white p-8 text-center shadow transform transition duration-100 hover:scale-110">
               
                <h3 className="mt-2  font-bold text-2xl text-gray-400">Vision</h3>
                <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide ">

                Our vision is to become the global leader in revolutionizing language proficiency development.  

                </p>
            </div>
            

         

           <div className="rounded-md border bg-white p-8 text-center shadow transition duration-100 hover:scale-110">
               
                <h3 className="mt-2  font-bold text-2xl text-gray-400">Mission</h3>
                <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-justify ">

                Our mission is to empower individuals to achieve their language proficiency goals through
                personalized, innovative, and accessible learning solutions. By harnessing the latest technology,
                we strive to make language learning engaging, efficient, and enjoyable for everyone. 

                </p>
            </div>

            <div className="rounded-md border bg-white p-8 text-center shadow transition duration-100 hover:scale-110">
               
               <h3 className="mt-2  font-bold text-2xl text-gray-400">Values</h3>

                <ul className="my-4">
                    <li >Innovation </li>
                    <li className="mt-5">Adaptability </li>
                    <li className="mt-5">Integrity  </li>
                </ul>
           </div>


        </div>

       

    </section>
</div>)
}
