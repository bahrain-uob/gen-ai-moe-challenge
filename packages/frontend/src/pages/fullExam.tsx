import Nav from '../components/Nav';
import Card from '../sections/currentExamCard'

const fullExam = () => {
  return (
    <main className="bg-[#FBF9F1] h-screen">
    <Nav/>
    <section className="w-full h-4/6 flex justify-center mt-8">
      <Card title='IELTS - Full Exam' remTime='34 : 21' startDate='13-04-24'/>
    </section>

    <section className="h-1/2">
      
    </section>

  </main>
  )
}

export default fullExam