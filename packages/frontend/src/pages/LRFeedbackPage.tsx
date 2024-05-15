import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { CircularProgressbarStyles } from 'react-circular-progressbar/dist/types';
//import { FaTimes, FaCheck } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { toJSON } from '../utilities';
import { get } from 'aws-amplify/api';

export default function LRFeedbackPage() {
  const { section, sk } = useParams<{
    section: string | undefined;
    sk: string | undefined;
  }>();
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

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
        console.log('data: ', data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [section, sk]);

  if (!data) {
    return (
      <div className="text-lg px-10 text-center mb-8 mt-6">Loading...</div>
    );
  }
  /* Circular Progress */
  const cpStyles: CircularProgressbarStyles = {
    // Customize the root svg element
    root: {},
    // Customize the path, i.e. the "completed progress"
    path: {
      stroke: '#3B828E',
      strokeWidth: 8,
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      // Trail color
      stroke: '#AAD7D9',
      strokeWidth: 8,
    },
    // Customize the text
    text: {
      // Text size
      fontSize: '0.95rem',
      textAnchor: 'middle', // Center horizontally
      dominantBaseline: 'middle', // Center vertically
    },
  };

  const circularFeedback = (
    <div className="flex justify-around items-center w-full md:flex-row flex-wrap mb-10">
      <div className="w-full md:w-1/6 p-3 text-center">
        <p className="text-lg font-semibold mb-2">CEFR Level</p>
        <CircularProgressbar
          value={data.BandScore}
          maxValue={9}
          text={data.europeanFrameworkGrade}
          styles={cpStyles}
        />
      </div>
      <div className="w-full md:w-1/6 p-3 text-center ">
        <p className="text-lg font-semibold mb-2">Band Score</p>
        <CircularProgressbar
          value={data.BandScore}
          maxValue={9}
          text={`${data.BandScore}/9`}
          styles={cpStyles}
        />
      </div>
    </div>
  );

  const handleViewAnswers = () => {
    navigate(`/answers/reading/${sk}`); // Navigate to the answers page
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-5 space-y-4">
        <h1 className="text-2xl font-bold mb-10">Feedback</h1>
        {circularFeedback}
        <div>
          <p className="text-lg px-10 text-center mb-8 mt-6">
            Basic competence is limited to familiar situations. Has frequent
            problems in understanding and expression. Is not able to use complex
            language.
          </p>
        </div>
        <button
          onClick={handleViewAnswers}
          className="bg-teal-500 text-white font-bold py-2 px-4 rounded-full hover:bg-teal-700 transition-colors"
        >
          View Your Answers
        </button>
      </div>
    </>
  );
}
