/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import ExamsHeader from './components/examsHeader';
 
interface ReadingPart {
  MyPartitionKey: string;
  MySortKey: string;
  NumOfQuestions: number;
  PassageTitle: string;
  Passage: string;
  Questions: Question[];
}
 
interface Question {
  NumOfSubQuestions: number;
  Question: string;
  QuestionType: string;
  SubQuestions: SubQuestion[];
}
 
interface SubQuestion {
  RowTitle: any;
  Choices: string[];
  CorrectAnswer: string;
  QuestionText: string;
  selectedAnswer: string;
}
 
const ReadingQuestions = () => {
  const [parts, setParts] = useState<ReadingPart[]>([]);
  const [activePart, setActivePart] = useState<string>('part1');
  const { section, sk } = useParams();
 
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${section}/${sk}`;
 
        const response = await fetch(url);
        const data = await response.json();
 
        setParts(data);
        setActivePart('part1');
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
 
    fetchParts();
  }, [sk]);
 
  const handlePartClick = (part: string) => {
    setActivePart(part);
  };
 
  const handleRadioChange = (
    partIndex: number,
    questionIndex: number,
    subQuestionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedValue = event.target.value;
    setParts(prevParts => {
      const updatedParts = [...prevParts];
      updatedParts[partIndex].Questions[questionIndex].SubQuestions[
        subQuestionIndex
      ].selectedAnswer = selectedValue;
      return updatedParts;
    });
  };
 
  const handleSelectChange = (
    partIndex: number,
    questionIndex: number,
    subQuestionIndex: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = event.target.value;
    setParts(prevParts => {
      const updatedParts = [...prevParts];
      updatedParts[partIndex].Questions[questionIndex].SubQuestions[
        subQuestionIndex
      ].selectedAnswer = selectedValue;
      return updatedParts;
    });
  };
 
  const handleInputChange = (
    partIndex: number,
    questionIndex: number,
    subQuestionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedValue = event.target.value;
    setParts(prevParts => {
      const updatedParts = [...prevParts];
      updatedParts[partIndex].Questions[questionIndex].SubQuestions[
        subQuestionIndex
      ].selectedAnswer = selectedValue;
      return updatedParts;
    });
  };
 
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    try {
      const studentAnswers = parts.map(part => {
        const partAnswers = part.Questions.map(question => {
          const subQuestionAnswers = question.SubQuestions.map(subQuestion => {
            return subQuestion.selectedAnswer;
          });
          return subQuestionAnswers;
        });
        return partAnswers;
      });
 
      console.log(studentAnswers);
 
      const url = `${import.meta.env.VITE_API_URL}/answers/${section}/${sk}`; // Replace with the actual URL and parameters
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentAnswers: studentAnswers,
        }),
      });
      const result = await response.json();
      console.log(result);
 
      if (response.ok) {
        console.log('Scores:', result.scores);
        console.log(result.europeanFrameworkGrade); // Adjust this part based on your API response
        // Handle the score display or any other actions here
 
       
      } else {
        console.error(
          'Error submitting answers or scores not returned:',
          result,
        );
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };
 
  const isValidPartSelected =
    activePart &&
    parts.length > 0 &&
    parseInt(activePart.charAt(4)) - 1 < parts.length;
 
  return (
    <>
      <ExamsHeader duration={60} />
      <div className="reading-part-container">
        {isValidPartSelected && (
          <div className="Reading-Part">
            <h1 className="part-number">{`Part ${parseInt(
              activePart.charAt(4),
            )}`}</h1>
            <h1 className="passage-title">
              {parts[parseInt(activePart.charAt(4)) - 1].PassageTitle}
            </h1>
            <p className="passage">
              {parts[parseInt(activePart.charAt(4)) - 1].Passage}
            </p>
          </div>
        )}
        <div className="Reading-Questions-Part">
          {isValidPartSelected &&
            parts[parseInt(activePart.charAt(4)) - 1].Questions.map(
              (question: Question, questionIndex: number) => (
                <div key={questionIndex} className="question-container">
                  <h2 className="question-num">{`Question ${
                    questionIndex + 1
                  }`}</h2>
                  <p className="question">{question.Question}</p>
                  {question.QuestionType === 'Summary Completion' ? (
                    // Render Summary Completion UI
 
                    <ul className="summary-completion">
                      {question.SubQuestions.map(
                        (
                          subQuestion: SubQuestion,
                          subQuestionIndex: number,
                        ) => (
                          <li
                            key={subQuestionIndex}
                            className="choice-container"
                          >
                            {`${subQuestionIndex + 1}-`}
                            {subQuestion.QuestionText.split('-answer-').map(
                              (part: string, index: number) => {
                                if (index % 2 === 0) {
                                  return <span key={index}>{part}</span>;
                                } else {
                                  return (
                                    <input
                                      key={index}
                                      type="text"
                                      className="placeholder"
                                      placeholder={`${subQuestionIndex + 1}`}
                                      value={subQuestion.selectedAnswer || ''}
                                      onChange={event =>
                                        handleInputChange(
                                          parseInt(activePart.charAt(4)) - 1,
                                          questionIndex,
                                          subQuestionIndex,
                                          event,
                                        )
                                      }
                                    />
                                  );
                                }
                              },
                            )}
                          </li>
                        ),
                      )}
                    </ul>
                  ) : question.QuestionType === 'Multiple Choice' ? (
                    <ul className="choices">
                      {question.SubQuestions.map(
                        (
                          subQuestion: SubQuestion,
                          subQuestionIndex: number,
                        ) => (
                          <li key={subQuestionIndex} className="MCQ-container">
                            <span>{`${subQuestionIndex + 1}-`}</span>
                            <span> {`${subQuestion.QuestionText}`}</span>
                            <ul className="MCQ-list">
                              {subQuestion.Choices.map(
                                (choice: any, choiceIndex: number) => (
                                  <li key={choiceIndex}>
                                    <label
                                      className={
                                        subQuestion.selectedAnswer === choice
                                          ? 'selected'
                                          : ''
                                      }
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${questionIndex}-subquestion-${subQuestionIndex}`}
                                        value={choice}
                                        checked={
                                          subQuestion.selectedAnswer === choice
                                        }
                                        onChange={event =>
                                          handleRadioChange(
                                            parseInt(activePart.charAt(4)) - 1,
                                            questionIndex,
                                            subQuestionIndex,
                                            event,
                                          )
                                        }
                                      />
                                      {choice}
                                    </label>
                                  </li>
                                ),
                              )}
                            </ul>
                          </li>
                        ),
                      )}
                    </ul>
                  ) : question.QuestionType === 'True False Not Given' ||
                    question.QuestionType ===
                      'Matching Paragraph Information' ||
                    question.QuestionType === 'List Selection' ||
                    question.QuestionType === 'Matching Headings' ||
                    question.QuestionType === 'Yes No Not Given' ||
                    question.QuestionType === 'Choosing a Title' ||
                    question.QuestionType === 'Classification' ||
                    question.QuestionType === 'Matching Sentence Endings' ? (
                    // Render Yes No Not Given Choice UI
                    <ul className="choices">
                      {question.SubQuestions.map(
                        (
                          subQuestion: SubQuestion,
                          subQuestionIndex: number,
                        ) => (
                          <li
                            key={subQuestionIndex}
                            className="choice-container"
                          >
                            {`${subQuestionIndex + 1}-`}
                            {subQuestion.QuestionText.split('-answer-').map(
                              (part: string, index: number) => {
                                if (index % 2 === 0) {
                                  return <span key={index}>{part}</span>;
                                } else {
                                  return (
                                    <select
                                      key={index}
                                      value={subQuestion.selectedAnswer || ''}
                                      onChange={event =>
                                        handleSelectChange(
                                          parseInt(activePart.charAt(4)) - 1,
                                          questionIndex,
                                          subQuestionIndex,
                                          event,
                                        )
                                      }
                                    >
                                      <option value="">
                                        {`${subQuestionIndex + 1}`}
                                      </option>
                                      {subQuestion.Choices.map(
                                        (choice: any, choiceIndex: number) => (
                                          <option
                                            key={choiceIndex}
                                            value={choice}
                                          >
                                            {choice}
                                          </option>
                                        ),
                                      )}
                                    </select>
                                  );
                                }
                              },
                            )}
                          </li>
                        ),
                      )}
                    </ul>
                  ) : question.QuestionType === 'Table Completion' ? (
                    // Render Yes No Not Given Choice UI
 
                    <div className="table-container">
                      <table>
                        <tbody>
                          {question.SubQuestions.map(
                            (
                              subQuestion: SubQuestion,
                              subQuestionIndex: number,
                            ) => (
                              <tr key={subQuestionIndex} className="custom-row">
                                <td>{subQuestion.RowTitle}</td>
                                <td>
                                  {subQuestion.QuestionText.split(
                                    '-answer-',
                                  ).map((part: string, index: number) => {
                                    if (index % 2 === 0) {
                                      return <span key={index}>{part}</span>;
                                    } else {
                                      return (
                                        <input
                                          className="placeholder"
                                          key={index}
                                          type="text"
                                          placeholder={`${
                                            subQuestionIndex + 1
                                          }`}
                                          value={
                                            subQuestion.selectedAnswer || ''
                                          }
                                          onChange={event =>
                                            handleInputChange(
                                              parseInt(activePart.charAt(4)) -
                                                1,
                                              questionIndex,
                                              subQuestionIndex,
                                              event,
                                            )
                                          }
                                        />
                                      );
                                    }
                                  })}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    // Handle other question types here
                    <p>Unsupported question type</p>
                  )}
                </div>
              ),
            )}
        </div>
      </div>
 
      <div className="reading-part-buttons">
        {parts.map((_part: ReadingPart, partIndex: number) => (
          <button
            key={partIndex}
            className={`part-button ${
              activePart === `part${partIndex + 1}` ? 'active' : ''
            }`}
            onClick={() => handlePartClick(`part${partIndex + 1}`)}
          >
            Part {partIndex + 1}
          </button>
        ))}
 
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};
 
export default ReadingQuestions;