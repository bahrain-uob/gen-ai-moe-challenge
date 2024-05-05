import { ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { PointsBadge } from '../components/PointsBadge';

export function WritingTask2Page_() {
  const [inputs, setInputs] = useState({
    question:
      'Space exploration is much too expensive and the money should be spent on more important things.\n\nWhat is your opinion?',
    answer:
      'There is an argument that exploring space is a waste of money and that there are more urgent needs to be addressed on earth, such as reducing poverty and preventing environmental destruction. However, I completely disagree with this opinion for two reasons.\n\nFirst of all, many of the technologies we take for granted today were originated thanks to space research. Take satellite technology, for example, which we depend on for broadcasting and weather forecasting. Without satellites, we would not be able to follow global events as they happen, nor give populations any warning of approaching storms. Space research has also led to the development of new lightweight materials that offer us heat protection and enable food preservation. Therefore, the challenge of sending human beings into space has often driven the development of new technologies that benefit our everyday lives.\n\nSecond, we cannot foresee the distant future, so we ought to develop the capability to escape from the earth. Gradually, we are learning how humans can survive for long periods in space and even travel to other planets in the future. If space exploration is halted, this valuable knowledge will never be acquired. It is true that environmental destruction is also a serious issue, but it is also true that we remain dependent on our environment if we never accept the challenge of exploring other worlds.\n\nIn conclusion, while we undoubtedly face serious problems on our own planet, it is imperative that we continue to explore space. This will promote further technological advances as well as provide a possible means of escape should earth become uninhabitable in future. Ideally, all nations should cooperate in the advancement of space research.',
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <>
      {/* TODO: use layouts */}
      <main className="bg-[#FBF9F1] min-h-screen">
        <Nav />
        <div className="py-40 px-8">
          <h1 className="text-2xl text-blue-4 font-bold text-center mb-12">
            Writing 2
          </h1>

          <section id="question" className="mb-12">
            <h2 className="font-bold mb-4">Question:</h2>
            <p className="whitespace-pre-line ml-4 mb-2">{inputs.question}</p>
            <div className="flex flex-row-reverse">
              <PointsBadge points={10} />
            </div>
          </section>

          <section id="answer">
            <form onSubmit={handleSubmit}>
              <h2 className="font-bold mb-6">Answer:</h2>
              {/* TODO: Fix textarea sizing */}
              <textarea
                className="bg-white w-full h-[50vh] p-4 mb-4 rounded-xl shadow-md resize-none outline-none"
                name="answer"
                placeholder="Answer"
                value={inputs.answer}
                onChange={handleChange}
              />

              {/* Submit button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-white text-blue-4 px-12 py-1 rounded-full shadow-md select-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
