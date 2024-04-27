import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  Choices: string[];
  CorrectAnswer: string;
  QuestionText: string;
  selectedAnswer: string; // New property to store the selected answer
}

const ReadingQuestions = () => {
  const [parts, setParts] = useState<ReadingPart[]>([]);
  const { section,sk } = useParams();

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${section}/${sk}`;
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

  const handleSelectChange = (
    partIndex: number,
    questionIndex: number,
    subQuestionIndex: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setParts((prevParts) => {
      const updatedParts = [...prevParts];
      updatedParts[partIndex].Questions[questionIndex].SubQuestions[subQuestionIndex].selectedAnswer = selectedValue;
      return updatedParts;
    });
  };

  console.log('parts:', parts);

  return (
    <div>
      <h1>Reading Section</h1>
      {parts.length > 0 ? (
        <>
          {parts.map((part: ReadingPart, partIndex: number) => (
            <React.Fragment key={partIndex}>
              <h2>Part {partIndex + 1}</h2>
              <div>
                <h2>{part.PassageTitle}</h2>
                <p>{part.Passage}</p>

                {part.Questions.map((question: Question, questionIndex: number) => (
                  <div key={questionIndex}>
                    <h2>Question {questionIndex + 1}</h2>
                    <h3>{question.Question}</h3>
                    <ul>
                      {question.SubQuestions.map((subQuestion: SubQuestion, subQuestionIndex: number) => (
                        <li key={subQuestionIndex}>
                          {subQuestion.QuestionText.split('-answer-').map((part: string, index: number) => {
                            if (index % 2 === 0) {
                              return <span key={index}>{part}</span>;
                            } else {
                              return (
                                <select
                                  key={index}
                                  value={subQuestion.selectedAnswer || ''}
                                  onChange={(event) =>
                                    handleSelectChange(partIndex, questionIndex, subQuestionIndex, event)
                                  }
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