import { CSSProperties, ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import { toJSON } from '../utilities';
import { post } from 'aws-amplify/api';

interface Response {
  'Coherence & Cohesion': string;
  'Grammatical Range & Accuracy': string;
  'Lexical Resource': string;
  'Task Responce': string;
}

function Writing() {
  const [inputs, setInputs] = useState({
    answer: '',
    question: '',
  });
  const [grading, setGrading] = useState(undefined as undefined | Response);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await toJSON(
      post({
        apiName: 'myAPI',
        path: '/writing',
        options: {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: {
            inputs,
          },
        },
      }),
    );

    console.log(response);
    setGrading(response);
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
          value={inputs.question}
          onChange={handleChange}
          {...size}
        />
        <br />

        <textarea
          name="answer"
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

export default Writing;
