import Nav from '../components/Nav';
import Sliding from '../sections/sliding';
import Continue from '../sections/continuePast';

const Home = () => (
  <main className="bg-[#FBF9F1] h-full">
    <Nav />
    <section className="w-full h-1/2 pb-10">
      <Sliding />
    </section>

    <section className="h-1/2">
      <Continue />
    </section>
  </main>
);

export default Home;
