import { ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import { PointsBadge } from '../components/PointsBadge';
import { WritingGrading, WritingSection, getSocketUrl } from '../utilities';
import { WritingFeedbackContainer } from '../components/WritingFeedback';
import useWebSocket from 'react-use-websocket';

export function WritingPage({
  task,
}: {
  task: WritingSection['task1'] | WritingSection['task2'];
}) {
  const [answer, setAnswer] = useState('');
  // Feedback from backend
  const [grading, setGrading] = useState<undefined | WritingGrading>(undefined);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // setInputs({ ...inputs, [e.target.name]: e.target.value });
    setAnswer(e.target.value);
  };

  const socketUrl = getSocketUrl() as string;

  const { sendMessage } = useWebSocket(socketUrl, {
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
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendMessage(
      JSON.stringify({
        action: 'gradeWriting',
        // data: { writingTask: 'Task 1', ...inputs },
        data: { writingTask: 'Task 2', question: task.question, answer },
      }),
    );
  };

  const image =
    'graphUrl' in task ? (
      <div className="flex flex-row justify-center my-12 mx-4">
        <img
          className="shadow-xl md:max-w-[50%] xl:max-w-[33%]"
          src={task.graphUrl}
          alt=""
        />
      </div>
    ) : (
      <></>
    );

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl text-blue-4 font-bold text-center mb-12">
        Writing 1
      </h1>

      <section id="question" className="mb-12">
        <h2 className="font-bold mb-4">Question:</h2>
        <p className="whitespace-pre-line ml-4 mb-6">{task.question}</p>
        {image}
        <div className="flex flex-row-reverse">
          <PointsBadge points={10} />
        </div>
      </section>

      <section id="answer" className="mb-12">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold mb-6">Answer:</h2>
          <textarea
            className="bg-white w-full h-[50vh] xl:h-[75vh] p-4 mb-2 rounded-xl shadow-md resize-none outline-none"
            name="answer"
            placeholder="Write your answer here..."
            value={answer}
            onChange={handleChange}
          />
          <div className="flex flex-row-reverse font-extralight mb-4">
            {/* Word count is {answer.trim().split(/\s+/).length} */}
            Word count is {countWords(answer)}
          </div>

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
    </div>
  );
}

const countWords = (str: string) =>
  str
    .replace(/[^A-Z0-9\s]/gi, '')
    .split(' ')
    .filter(n => n != '').length;
