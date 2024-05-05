import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import { FaTimes, FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toJSON } from '../utilities';
import { get } from 'aws-amplify/api';

export default function FeedbackPage() {
  const { section, sk } = useParams<{ section: string | undefined; sk: string | undefined }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!section || !sk) return;

    toJSON(
      get({
        apiName: 'myAPI',
        path: `/scores/${section}/${sk}`,
      }),
    )
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