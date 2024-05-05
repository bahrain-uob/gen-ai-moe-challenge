import { ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { PointsBadge } from '../components/PointsBadge';

export function WritingTask1Page_() {
  const [inputs, setInputs] = useState({
    question:
      'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying fulltime or part-time.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    answer:
      'This is a bar chart of the number of men and women in further education in Britain in three periods.  In 1970, Most of Men were studying part-time but from 1980, studying part-time was decreased and studying full-time was increased and in 1990, it was twice as many students as in 1970.  On the other hand, women studying Full-time were increased and not only Full-time, part-time also were increased, in 1990, Studying full-time was three times as many students as in 1970.  If compare Men and Women, as you see, in 1970, Men were Studying more than women full-time or part-time but it changed from 1980 and then, in 1990, Women were studying part-time more than Men and Studying full-time was same number.  It shows you Women has a high education now.',
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
            Writing 1
          </h1>

          <section id="question" className="mb-12">
            <h2 className="font-bold mb-4">Question:</h2>
            <p className="whitespace-pre-line ml-4 mb-2">{inputs.question}</p>
            <div className="flex flex-row justify-center my-12 mx-4">
              {/* TODO: Don't hard code image url */}
              <img
                className="shadow-xl md:max-w-[50%] xl:max-w-[33%]"
                src="/assets/out-000.png"
                alt=""
              />
            </div>
            <div className="flex flex-row-reverse">
              <PointsBadge points={10} />
            </div>
          </section>

          <section id="answer">
            <form onSubmit={handleSubmit}>
              <h2 className="font-bold mb-6">Answer:</h2>
              {/* TODO: Fix textarea sizing */}
              <textarea
                className="bg-white w-full h-[50vh] p-4 rounded-xl shadow-md resize-none outline-none"
                name="answer"
                placeholder="Answer"
                value={inputs.answer}
                onChange={handleChange}
              />
              {/* TODO: Add proper submit button */}
              <button type="submit"> Submit </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
