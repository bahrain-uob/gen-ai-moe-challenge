/* eslint-disable @typescript-eslint/no-explicit-any */
/*import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



export default function FeedbackPage() {
  const { section, sk } = useParams<{  section: string | undefined; sk: string | undefined }>();
  if (!section || !sk) {
    return <div>Invalid URL</div>;
  }
 // const sortKey=section+sk;
  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/scores/${section}/${sk}`;

    // Fetch the data from the API endpoint
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle the retrieved data here
      })
      .catch(error => {
        // Handle error if the API call fails
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className="feedback-main">

          
        <div className="feedback-content">
          <h1>You are all done!</h1>


          <div className="feedback-info">
            <div style={{ width: 100, height: 100 }}>
              <CircularProgressbar value={30} maxValue={60} text="A1"   styles={buildStyles({ pathColor: '#3b828e',
                textColor: '#3b828e',
                trailColor: '#d6d6d6',
    
                        })}/>
                       <p>level</p>
            </div>
   

            <div style={{ width: 120, height: 100 }}> <CircularProgressbar value={13} maxValue={60} text="13/40"   styles={buildStyles({ pathColor: '#3b828e',
               textColor: '#3b828e',
                trailColor: '#d6d6d6',
    
                        })}/>
                 <p>score</p>
            </div>

            <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar value={30} maxValue={60} text="20:00"   styles={buildStyles({ pathColor: '#3b828e',
                textColor: '#3b828e',
                trailColor: '#d6d6d6',
    
                        })}/>
              <p>time</p>
            </div>
          </div>
          
          <table className='table-full'>
  <tr className='tr-cell'>
    <th className="th-cell">question number</th>
    <th className="th-cell">your answer</th>
    <th className="th-cell">correct answer</th>
    <th className="th-cell">grade</th>
  </tr>
  <tr className='tr-cell'>
    <td className="td-cell">something</td>
    <td className="td-cell">not something</td>
    <td className="td-cell">not something</td>
  </tr>
  <tr>
    <td className="td-cell">something</td>
    <td className="td-cell">
      <FaTimes className="icon-correct" />
    </td>
    <td className="td-cell">
      <FaCheck className="icon-wrong" />
    </td>
  </tr>
</table>
        </div>
      </div>
    </div>
  );
}*/

/*
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';


interface Question {
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  score: number;
}

const FeedbackPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { section, sk } = useParams<{  section: string | undefined; sk: string | undefined }>();
  if (!section || !sk) {
    return <div>Invalid URL</div>;
  }
  const sortKey=section+sk;

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/scores/student10/${sortKey}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');

        const data: any[] = await response.json();
        const formattedQuestions: Question[] = data.map((item: any) => ({
          questionText: item.Questions.map((q: any) => q.QuestionText).join('\n'),
          studentAnswer: item.Questions.map((q: any) => q.selectedAnswer).join(', '),
          correctAnswer: item.Questions.map((q: any) => q.CorrectAnswer).join(', '),
          score: item.Questions.reduce((a: number, q: any) => a + q.score, 0),
        }));
        setQuestions(formattedQuestions);
      } catch (err: any) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [section, sk]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Feedback Page</h1>
      {Render the questions and their details}
      {questions.map((question, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>
          <p>Question Text: {question.questionText}</p>
          <p>Student Answer: {question.studentAnswer}</p>
          <p>Correct Answer: {question.correctAnswer}</p>
          <p>Score: {question.score}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackPage;*/
/*
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css';

export default function FeedbackPage() {
  const { section, sk } = useParams<{  section: string | undefined; sk: string | undefined }>();
  if (!section || !sk) {
    return <div>Invalid URL</div>;
  }
 // const sortKey=section+sk;
  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/scores/${section}/${sk}`;

    // Fetch the data from the API endpoint
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle the retrieved data here
      })
      .catch(error => {
        // Handle error if the API call fails
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="feedback-main">
        <div className="feedback-content">
          <h1>You are all done!</h1>
          { Rest of the component code }
        </div>
      </div>
    </div>
  );
}*/

import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import { FaTimes, FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import '../App.css';

export default function FeedbackPage() {
  const { section, sk } = useParams<{ section: string | undefined; sk: string | undefined }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!section || !sk) return;

    const url = `${import.meta.env.VITE_API_URL}/scores/${section}/${sk}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log("data: ",data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [section, sk]);

 
  if (!data) {
    return <div>Loading...</div>;
  }

  console.log("band: ",data.europeanFrameworkGrade);
  console.log("score: ",data.totalScore);
  console.log("studentAnswers: ", data.studentAnswers);
  console.log("scores: ", data.scores);



  return (
    <div className="feedback-main">
      <div className="feedback-content">
        <h1>You are all done!</h1>
        <div className="feedback-info">
          <div style={{ width: 120, height: 100 }}>
            <h3>Band Score</h3>
            <CircularProgressbar
              value={data.BandScore}
              maxValue={9} 
              text={data.europeanFrameworkGrade}
              styles={buildStyles({
                pathColor: '#3b828e',
                textColor: '#3b828e',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <div style={{ width: 120, height: 100 }}>
          <h3>Total Score</h3>
            <CircularProgressbar
              value={data.totalScore}
              maxValue={40} // Set according to the max possible score
              text={`${data.totalScore}/40`}
              styles={buildStyles({
                pathColor: '#3b828e',
                textColor: '#3b828e',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
        </div>
        <h2>Your Answers</h2>
        <table className='table-full'>
          <tr className='tr-cell'>
            <th className="th-cell">Question Number</th>
            <th className="th-cell">Your Answer</th>
            <th className="th-cell">Correct Answer</th>
            <th className="th-cell">Score</th>
          </tr>
          {data.studentAnswers.map((answer: string, index: number) => (
            <tr className="tr-cell" key={index+1}>
              <td className="td-cell">{index}</td>
              <td className="td-cell">{answer || 'no answer'}</td>
              <td className="td-cell">{data.CorrectAnswers[index]}</td>
              <td className="td-cell">{data.scores[index]}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}