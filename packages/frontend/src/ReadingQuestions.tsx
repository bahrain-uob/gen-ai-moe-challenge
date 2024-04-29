import React, { ChangeEvent, useEffect, useState } from 'react';
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
  Choices: string[];
  CorrectAnswer: string;
  QuestionText: string;
  selectedAnswer: string; // New property to store the selected answer
}
 
const ReadingQuestions = () => {
  const [parts, setParts] = useState<ReadingPart[]>([]);
  const [activePart, setActivePart] = useState<string>('part1');
  const { section, sk } = useParams();
 console.log("get request : ");
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${section}/${sk}`;
        console.log('Fetching URL:', url);
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
 
  const handleSelectChange = (
    partIndex: number,
    questionIndex: number,
    subQuestionIndex: number,
    event: React.ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const selectedValue = event.target.value;
    setParts((prevParts) => {
      const updatedParts = [...prevParts];
      updatedParts[partIndex].Questions[questionIndex].SubQuestions[subQuestionIndex].selectedAnswer = selectedValue;
      return updatedParts;
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submit action
 
    // Log the user's answers and calculate the total score
    let totalScore = 0;
    let totalQuestions = 0;
 
    parts.forEach((part, partIndex) => {
      console.log(`Part ${partIndex + 1}:`);
      part.Questions.forEach((question, questionIndex) => {
        console.log(`Question ${questionIndex + 1}: ${question.Question}`);
        question.SubQuestions.forEach((subQuestion, subQuestionIndex) => {
          console.log(`SubQuestion ${subQuestionIndex + 1}: ${subQuestion.QuestionText}`);
          console.log(`Chosen Answer: ${subQuestion.selectedAnswer}`);
 
          const isCorrect = subQuestion.selectedAnswer === subQuestion.CorrectAnswer;
          const score = isCorrect ? 1 : 0;
          totalScore += score;
          totalQuestions++;
        });
      });
    });
 
    console.log(`Total Score: ${totalScore}/${totalQuestions}`);
    console.log("get request : ");
    try {
      const url = `${import.meta.env.VITE_API_URL}/answers/${section}/${sk}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sk,
        parts,
      }),
    });
 
    const result = await response.json();
    if (response.ok && result.scores) {
      console.log('Scores:', result.scores);
      // Handle the score display or any other actions here
    } else {
      console.error('Error submitting answers or scores not returned:', result);
    }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };
  // Check if parts array is populated and activePart is valid before rendering
  const isValidPartSelected =
    activePart &&
    parts.length > 0 &&
    parseInt(activePart.charAt(4)) - 1 < parts.length;
 
  return (
    <>
    <ExamsHeader duration={60}/>
      <div className="reading-part-container">
        {isValidPartSelected && (
          <div className="Reading-Part">
            <h1 className="part-number">{`Part ${parseInt(activePart.charAt(4))}`}</h1>
            <h1 className="passage-title">{parts[parseInt(activePart.charAt(4)) - 1].PassageTitle}</h1>
            <p className="passage">{parts[parseInt(activePart.charAt(4)) - 1].Passage}</p>
          </div>
        )}
          <form onSubmit={handleSubmit}>
  <div className="Reading-Questions-Part">
    {isValidPartSelected &&
      parts[parseInt(activePart.charAt(4)) - 1].Questions.map((question: Question, questionIndex: number) => (
        <div key={questionIndex} className="question-container">
          <h2 className="question-num">{`Question ${questionIndex + 1}`}</h2>
          <p className="question">{question.Question}</p>
          <ul className="choices">
            {question.SubQuestions.map((subQuestion: SubQuestion, subQuestionIndex: number) => (
              <li key={subQuestionIndex} className="choice-container">
                {`${subQuestionIndex + 1}-`}
                {subQuestion.QuestionText.split('-answer-').map((part: string, index: number) => {
                  if (index % 2 === 0) {
                    return <span key={index}>{part}</span>;
                  } else {
                    // Check if the question type requires a dropdown menu
                    const isDropdown = ['Matching Paragraph Information', 'True False Not Given', 'List Selection', 'Matching Headings', 'Yes No Not Given', 'Choosing a Title', 'Classification', 'Matching Sentence Endings'].includes(question.QuestionType);
                    // Render dropdown menu or radio buttons based on question type
                    return isDropdown ? (
                      <select
                        key={index}
                        value={subQuestion.selectedAnswer || ''}
                        onChange={(event) =>
                          handleSelectChange(
                            parseInt(activePart.charAt(4)) - 1,
                            questionIndex,
                            subQuestionIndex,
                            event
                          )
                        }
                      >
                        <option value="">-- Select Answer --</option>
                        {subQuestion.Choices.map((choice: any, choiceIndex: number) => (
                          <option key={choiceIndex} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </select>
                    ) : (
                      // Render radio buttons for 'Multiple Choice'
                      subQuestion.Choices.map((choice: any, choiceIndex: number) => (
                        <label key={choiceIndex}>
                          <input
                            type="radio"
                            name={`question-${questionIndex}-choice`}
                            value={choice}
                            checked={subQuestion.selectedAnswer === choice}
                            onChange={(event) =>
                              handleSelectChange(
                                parseInt(activePart.charAt(4)) - 1,
                                questionIndex,
                                subQuestionIndex,
                                event
                              )
                            }
                          />
                          {choice}
                        </label>
                      ))
                    );
                  }
                })}
              </li>
            ))}
          </ul>
        </div>
      ))}
  </div>
  <button type="submit">Submit Answers</button>
</form>
      </div>
 
      <div className="reading-part-buttons">
        {parts.map((_part: ReadingPart, partIndex: number) => (
          <button
            key={partIndex}
            className={`part-button ${activePart === `part${partIndex + 1}` ? 'active' : ''}`}
            onClick={() => handlePartClick(`part${partIndex + 1}`)}
          >
            Part {partIndex + 1}
          </button>
        ))}
</div>
  </>
 );
};
 
export default ReadingQuestions;