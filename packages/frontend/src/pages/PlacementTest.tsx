import Nav from "../components/Nav"
const options='bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';
const PlacementTest = () => {

  return (
    <main>
    <Nav/>
    <section className="w-full flex justify-center h-1/3">
        <div className="w-1/2 flex flex-col items-center rounded-xl">
            <h3 className="font-bold text-4xl pb-12">________ did you do today?</h3>
            <div className="flex flex-row w-full flex-wrap justify-between">
                <div className={options}>What</div>
                <div className={options}>Who</div>
                <div className={options}>Where</div>
                <div className={options}>When</div>
            </div>
    </div>
    </section>
    </main>
  )
}

export default PlacementTest