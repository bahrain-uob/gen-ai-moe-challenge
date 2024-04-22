import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReadingQuestions = () => {
  const [parts, setParts] = useState<any[]>([]);
  const { sk } = useParams();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/reading/${sk}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('Response data:', data);
        setParts(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchParts();
  }, [sk]);


  console.log('parts:', parts);

  return (
    <div>
      <h1>Reading Section</h1>
      {parts.length > 0 ? (
        <>
          {parts.map((part: any, partIndex: number) => (
            <React.Fragment key={partIndex}>
              <h2>Part {partIndex + 1}</h2>
              <div>
                <h2>{part[0].PassageTitle}</h2>
                <p>{part[0].Passage}</p>

                {part[0].Questions.map((question: any, questionIndex: number) => (
                  <div key={questionIndex}>
                    <h2>Question {questionIndex + 1}</h2>
                    <h3>{question.Question}</h3>
                    <ul>
                      {question.SubQuestions.map((subQuestion: any, subQuestionIndex: number) => (
                      <li key={subQuestionIndex}>
                      {subQuestion.QuestionText.split('-answer-').map((part: string, index: number) => {
                        if (index % 2 === 0) {
                          return <span key={index}>{part}</span>;
                        } else {
                          return (
                            <select
                              key={index}
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
                          );
                        }
                      })}
                    </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default ReadingQuestions;