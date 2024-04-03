import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

function Writing() {
  const [inputs, setInputs] = useState({
    answer: '',
    question: '',
  });
  const [grading, setGrading] = useState('Grading comes here');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/writing`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    }).then(response => {
      response.json().then(body => setGrading(body.feedback));
    });
    alert('Sending Message to ' + url);
  };

  const size = {
    rows: 10,
    cols: 80,
  };

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

        <textarea value={grading} readOnly {...size} />
        <br />

        <button type="submit"> Submit </button>
      </form>

      <Link to="/"> Link back to root </Link>
    </>
  );
}

export default Writing;
