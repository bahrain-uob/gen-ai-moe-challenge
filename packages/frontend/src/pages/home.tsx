import Sliding from '../sections/sliding';
import Continue from '../sections/continuePast';

const Home = () => (
  <>
    <section className="w-full h-1/2 pb-10">
      <Sliding />
    </section>

    <section className="h-1/2">
      <Continue />
    </section>
  </>
);

export default Home;
