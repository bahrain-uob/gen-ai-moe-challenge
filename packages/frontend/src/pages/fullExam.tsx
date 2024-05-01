import Nav from '../components/Nav';
import Card from '../sections/currentExamCard'
import PastTests from '../sections/pastTests'

const fullExam = () => {
  return (
    <main className="bg-[#FBF9F1] h-full">
    <Nav/>
    <section className="w-full h-4/6 flex justify-center my-8">
        <Card title='IELTS - Full Exam' remTime='34 : 21' startDate='13-04-24' timing='Remaining Time'/>
    </section>

    <section className="h-1/2">
        <PastTests/>
    </section>

  </main>
  )
}

export default fullExam