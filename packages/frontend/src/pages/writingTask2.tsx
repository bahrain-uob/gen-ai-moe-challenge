import { CSSProperties, ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

export interface WritingGrading {
  'Coherence & Cohesion': string;
  'Grammatical Range & Accuracy': string;
  'Lexical Resource': string;
  'Task Responce': string;
  'Combined Feedback': string;
}

function WritingTask2Page() {
  const [inputs, setInputs] = useState({
    answer: '',
    question: '',
  });
  const [grading, setGrading] = useState(
    undefined as undefined | WritingGrading,
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

    //get the websocket url from the environment
    const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;

    //initialize the websocket
    const {
      sendMessage,
    } = useWebSocket(socketUrl, {
      onOpen: (event) => console.log('opened', event),
      onClose: (event) => console.log('closed', event),
      onMessage: e => {
        console.log('event', e);
        const response = JSON.parse(e.data);
        console.log('message', response);
        if (response['Coherence & Cohesion']) {
          setGrading(response);
        }
      },
      onError: console.log,
      shouldReconnect: () => true,
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //send the message to the backend using the websocket
    sendMessage(JSON.stringify({action: 'gradeWriting', data: {writingTask: 'Task 2',   ...inputs,}}));

  };

  const size = {
    rows: 10,
    cols: 80,
  };

  const pStyling: CSSProperties = { whiteSpace: 'pre-line' };

  const gradingElement = grading ? (
    <>
      <h5>Coherence & Cohesion</h5>
      <p style={pStyling}> {grading['Coherence & Cohesion']} </p>
      <h5>Grammatical Range & Accuracy</h5>
      <p style={pStyling}> {grading['Grammatical Range & Accuracy']} </p>
      <h5>Lexical Resource</h5>
      <p style={pStyling}> {grading['Lexical Resource']} </p>
      <h5>Task Responce</h5>
      <p style={pStyling}> {grading['Task Responce']} </p>
    </>
  ) : (
    <p style={{ whiteSpace: 'pre-line' }}> {grading} </p>
  );

  return (
    <>
      <h4> A demo page </h4>

      <form onSubmit={handleSubmit}>
        <textarea
          name="question"
          placeholder="Question"
          value={inputs.question}
          onChange={handleChange}
          {...size}
        />
        <br />

        <textarea
          name="answer"
          placeholder="Answer"
          value={inputs.answer}
          onChange={handleChange}
          {...size}
        />
        <br />

        <h4>Feedback</h4>

        {gradingElement}
        <br />

        <button type="submit"> Submit </button>
      </form>

      {/* <Link to="/"> Link back to root </Link> */}
    </>
  );
}

export default WritingTask2Page;
