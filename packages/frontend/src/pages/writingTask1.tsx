import { CSSProperties, ChangeEvent, FormEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
import { WritingGrading } from './writingTask2';

function WritingTask1Page() {
  const [inputs, setInputs] = useState({
    answer:
      'This is a bar chart of the number of men and women in further education in Britain in three periods.  In 1970, Most of Men were studying part-time but from 1980, studying part-time was decreased and studying full-time was increased and in 1990, it was twice as many students as in 1970.  On the other hand, women studying Full-time were increased and not only Full-time, part-time also were increased, in 1990, Studying full-time was three times as many students as in 1970.  If compare Men and Women, as you see, in 1970, Men were Studying more than women full-time or part-time but it changed from 1980 and then, in 1990, Women were studying part-time more than Men and Studying full-time was same number.  It shows you Women has a high education now.',
    graphDescription:
      'Period: 1970/71\n- Number of men: 1000 as part-time and 100 as full-time\n- Number of women: 700 as part-time and 50 as full-time\n\nPeriod: 1980/81\n- Number of men: 850 as part-time and 150 as full-time\n- Number of women: 800 as part-time and 200 as full-time\n\nPeriod: 1990/91\n- Number of men: 900 as part-time and 225 as full-time\n- Number of women: 1100 as part-time and 225 as full-time',
    question:
      'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying fulltime or part-time.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.',
  });
  const [grading, setGrading] = useState(
    undefined as undefined | WritingGrading,
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/grade-writing`;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        writingTask: 'Task 1',
        ...inputs,
      }),
    }).then(response => {
      response.json().then(body => {
        console.log(body);
        setGrading(body);
      });
    });
    alert('Sending Message to ' + url);
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
      <br />
      <br />
      <h5>Combined Feedback</h5>
      <p style={pStyling}> {grading['Combined Feedback']} </p>
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
          placeholder="Question"
          onChange={handleChange}
          {...size}
        />
        <br />

        <textarea
          name="graphDescription"
          placeholder="Graph Description"
          value={inputs.graphDescription}
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

export default WritingTask1Page;
