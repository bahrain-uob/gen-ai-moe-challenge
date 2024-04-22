import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReadingQuestions = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const { pk, sk } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/reading/${pk}/${sk}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('Response data:', data);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [pk, sk]);

  const handleAnswerChange = (questionIndex: number, subQuestionIndex: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].Questions[subQuestionIndex].SelectedAnswer = event.target.value;
    setQuestions(updatedQuestions);
  };

  

  
  return (
    <div>
      <h1>Reading Questions</h1>
      {questions.length > 0 ? (
        <div>
          <h2>{questions[0].PassageTitle}</h2>
          <p>{questions[0].Passage}</p>

          {questions[0].Questions.map((question: any, questionIndex: number) => (
            <div key={questionIndex}>
              <h2>Question {questionIndex + 1}</h2>
              <h3>{question.Question}</h3>
              <ul>
                {question.SubQuestions.map((subQuestion: any, subQuestionIndex: number) => (
                  <li key={subQuestionIndex}>

                    {subQuestion.QuestionText}
                    <ul>
                      Choices:
                      <select
                        value={subQuestion.SelectedAnswer || ''}
                        onChange={(event) => handleAnswerChange(questionIndex, subQuestionIndex, event)}
                      >
                        <option value="">-- Select Answer --</option>
                        {subQuestion.Choices.map((choice: any, choiceIndex: number) => (
                          <option key={choiceIndex} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default ReadingQuestions;