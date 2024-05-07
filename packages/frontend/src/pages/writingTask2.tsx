import { CSSProperties, ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import CollapsableCard from '../components/collapsableCard';
import useWebSocket from 'react-use-websocket';
import { WritingGrading, updateSocketUrl } from '../utilities';


function WritingTask2Page() {
  const [inputs, setInputs] = useState({
    answer: '',
    question: '',
  });
  const [grading, setGrading] = useState(
    undefined as undefined | WritingGrading,
  );

  // socket url
  const [socketUrl, setSocketUrl] = useState<string>(``);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  updateSocketUrl(setSocketUrl);

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


  let grammarMistakes = null;
  if (grading && grading['Grammer Tool Feedback']) {
    grammarMistakes = grading['Grammer Tool Feedback'].map((mistake, index) => {
      const context = mistake.context.text;
      const before = context.substring(0, mistake.context.offset);
      const inner = context.substring(mistake.context.offset, mistake.context.offset + mistake.context.length);
      const after = context.substring(mistake.context.offset + mistake.context.length);

      const title = (
        <>
          <span>{before.trim()} </span>
          <span className="bg-yellow-300">{inner.trim()}</span>
          <span> {after.trim()}</span>
        </>
      );

      return (
        <CollapsableCard title={title} key={index}>
          {JSON.stringify(mistake)}
        </CollapsableCard>
      );
    });
  }

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
      <h5>Grammar Tool Feedback</h5>
      {grammarMistakes? grammarMistakes : <p>No Mistakes Found</p>}
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

        <button type="submit"> Submit </button>
      </form>

      <br />

      <h4>Feedback</h4>

      {gradingElement}
    
      {/* <Link to="/"> Link back to root </Link> */}
    </>
  );
}

export default WritingTask2Page;
