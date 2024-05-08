import { ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import { PointsBadge } from '../components/PointsBadge';
import { WritingGrading } from '../utilities';
import { WritingFeedbackContainer } from '../components/WritingFeedback';
import useWebSocket from 'react-use-websocket';

export function WritingTask1Page_() {
  const [inputs, setInputs] = useState({
    question:
      'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying fulltime or part-time.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    graphDescription:
      'Period: 1970/71\n- Number of men: 1000 as part-time and 100 as full-time\n- Number of women: 700 as part-time and 50 as full-time\n\nPeriod: 1980/81\n- Number of men: 850 as part-time and 150 as full-time\n- Number of women: 800 as part-time and 200 as full-time\n\nPeriod: 1990/91\n- Number of men: 900 as part-time and 225 as full-time\n- Number of women: 1100 as part-time and 225 as full-time',
    answer:
      'This is a bar chart of the number of men and women in further education in Britain in three periods.  In 1970, Most of Men were studying part-time but from 1980, studying part-time was decreased and studying full-time was increased and in 1990, it was twice as many students as in 1970.  On the other hand, women studying Full-time were increased and not only Full-time, part-time also were increased, in 1990, Studying full-time was three times as many students as in 1970.  If compare Men and Women, as you see, in 1970, Men were Studying more than women full-time or part-time but it changed from 1980 and then, in 1990, Women were studying part-time more than Men and Studying full-time was same number.  It shows you Women has a high education now.',
  });
  // Feedback from backend
  const [grading, setGrading] = useState<undefined | WritingGrading>(undefined);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { sendMessage } = useWebSocket(
    // Get the websocket url from the environment
    import.meta.env.VITE_WEBSOCKET_URL as string,
    {
      onOpen: event => console.log('opened', event),
      onClose: event => console.log('closed', event),
      onMessage: e => {
        console.log('event', e);
        const response = JSON.parse(e.data);
        console.log('message', response);
        if (response['Coherence & Cohesion']) {
          setGrading(response);
        }
      },
      shouldReconnect: () => true,
    },
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendMessage(
      JSON.stringify({
        action: 'gradeWriting',
        data: { writingTask: 'Task 1', ...inputs },
      }),
    );
  };

  return (
    <>
      <h1 className="text-2xl text-blue-4 font-bold text-center mb-12">
        Writing 1
      </h1>

      <section id="question" className="mb-12">
        <h2 className="font-bold mb-4">Question:</h2>
        <p className="whitespace-pre-line ml-4 mb-6">{inputs.question}</p>
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

      <section id="answer" className="mb-12">
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
      {grading && (
        <section id="feedback">
          <h2 className="font-bold mb-6">Feedback:</h2>
          <WritingFeedbackContainer feedback={grading} />
        </section>
      )}
    </>
  );
}
