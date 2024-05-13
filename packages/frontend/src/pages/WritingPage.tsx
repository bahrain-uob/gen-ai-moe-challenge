import { ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import { PointsBadge } from '../components/PointsBadge';
import { WritingFeedback, WritingSection, getSocketUrl } from '../utilities';
import useWebSocket from 'react-use-websocket';
import { WSFeedbackComponent } from '../components/WSFeedback';

export function WritingPage({
  task,
}: {
  task: WritingSection['task1'] | WritingSection['task2'];
}) {
  const [answer, setAnswer] = useState('');
  // Feedback from backend
  const [grading, setGrading] = useState<undefined | WritingFeedback>({
    // JSON.parse(
    //   '{"Coherence & Cohesion":"The student\'s answer received a score of 0.\\n\\nThe student did not provide any relevant message and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. The student\'s answer was essentially a blank response, and it appears that they did not attend or attempt the question in any way.\\n\\nIn conclusion, the student\'s answer is rated as 0 out of 10, as it fails to meet the minimum requirements for a response. The student did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message.","Grammatical Range & Accuracy":"Score: 0\\n\\nThe student did not attempt the question and provided an answer of 20 words or fewer. There is no rateable language evident in the student\'s response, and it is considered a non-response. Therefore, a score of 0 is assigned.","Lexical Resource":"The student\'s answer is rated as 0. The student provided an answer of 20 words or fewer, which is rated at Band 1 according to the rubric. The student did not attempt the question in any way, used a language other than English throughout, or where there is proof that a candidate\'s answer has been totally memorised. Therefore, a score of 0 is appropriate.","Task Responce":"The student\'s answer is rated as 0. The content is wholly unrelated to the prompt. There are no ideas, and there is little direct response to the question. The response is rated as 0 because it does not meet the minimum word count requirement of 20 words.","Grammer Tool Feedback":[{"message":"Possible spelling mistake found.","shortMessage":"Spelling mistake","replacements":[{"value":"answer"}],"offset":11,"length":6,"context":{"text":"This is my ansewr","offset":11,"length":6},"sentence":"This is my ansewr","type":{"typeName":"UnknownWord"},"rule":{"id":"MORFOLOGIK_RULE_EN_US","description":"Possible spelling mistake","issueType":"misspelling","category":{"id":"TYPOS","name":"Possible Typo"}},"ignoreForIncompleteSentence":false,"contextForSureMatch":0}],"Combined Feedback":"Here is a combined feedback for the student:\\n\\nYour response did not meet the minimum requirements for a response. You did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. In addition, your answer was very short, with only 20 words, and did not attempt the question in any way.\\n\\nTo improve your response, you should focus on providing a clear and concise message that is relevant to the prompt. You should also ensure that your writing is organized and well-structured, with a clear introduction, body, and conclusion. Additionally, you should use appropriate language and vocabulary to convey your ideas effectively.\\n\\nIf you have any questions or need further assistance, please do not hesitate to ask."}',
    // ),
    'Coherence & Cohesion': {
      score: 3,
      text: "The student's answer received a score of 0.\n\nThe student did not provide any relevant message and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. The student's answer was essentially a blank response, and it appears that they did not attend or attempt the question in any way.\n\nIn conclusion, the student's answer is rated as 0 out of 10, as it fails to meet the minimum requirements for a response. The student did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message.",
    },
    'Grammatical Range & Accuracy': {
      score: 4,
      text: "Score: 0\n\nThe student did not attempt the question and provided an answer of 20 words or fewer. There is no rateable language evident in the student's response, and it is considered a non-response. Therefore, a score of 0 is assigned.",
    },
    'Lexical Resource': {
      score: 2,
      text: "The student's answer is rated as 0. The student provided an answer of 20 words or fewer, which is rated at Band 1 according to the rubric. The student did not attempt the question in any way, used a language other than English throughout, or where there is proof that a candidate's answer has been totally memorised. Therefore, a score of 0 is appropriate.",
    },
    'Task Responce': {
      score: 2,
      text: "The student's answer is rated as 0. The content is wholly unrelated to the prompt. There are no ideas, and there is little direct response to the question. The response is rated as 0 because it does not meet the minimum word count requirement of 20 words.",
    },
    score: 3.75,
    'Combined Feedback':
      'Here is a combined feedback for the student:\n\nYour response did not meet the minimum requirements for a response. You did not provide any relevant message, and the entire response was off-topic. There was little evidence of control of organizational features, and the writing failed to communicate any message. In addition, your answer was very short, with only 20 words, and did not attempt the question in any way.\n\nTo improve your response, you should focus on providing a clear and concise message that is relevant to the prompt. You should also ensure that your writing is organized and well-structured, with a clear introduction, body, and conclusion. Additionally, you should use appropriate language and vocabulary to convey your ideas effectively.\n\nIf you have any questions or need further assistance, please do not hesitate to ask.',
    'Grammer Tool Feedback': [
      {
        context: { text: 'My Ansewr si', offset: 3, length: 6 },
        message: 'Possible spelling mistake found.',
      },
    ],
  });

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
        Writing {'graphUrl' in task ? '1' : '2'}
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
          <WSFeedbackComponent feedback={grading} />
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
