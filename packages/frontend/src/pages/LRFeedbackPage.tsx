import { useEffect, useState } from 'react';
//import { FaTimes, FaCheck } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { toJSON } from '../utilities';
import { get } from 'aws-amplify/api';
import { DoubleCircles } from '../components/DoubleCirclesComponent';

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

  const circularFeedback = (
    <DoubleCircles
      leftCircleProps={{
        value: data.BandScore,
        maxValue: 9,
        text: data.europeanFrameworkGrade,
      }}
      rightCircleProps={{
        value: data.BandScore,
        maxValue: 9,
        text: `${data.BandScore}/9`,
      }}
    />
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
