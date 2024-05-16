import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../stylesheets/readingStyling.css';
import '../stylesheets/exam.css';
import ExamsHeader from '../components/examsHeader';
import { get, post } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import WaveSurfer from 'wavesurfer.js';
import WaveSurferParams from 'wavesurfer.js';

interface ListeningPart {
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
  RowTitle: String;
  Choices: string[];
  CorrectAnswer: string;
  QuestionText: string;
  selectedAnswer: string;
}

const ListeningQuestionsPage = () => {
  const [parts, setParts] = useState<ListeningPart[]>([]);
  const [activePart, setActivePart] = useState<string>('part1');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioFinished, setAudioFinished] = useState<boolean>(false);
  const { section, sk } = useParams();
  const [wavesurfer, setWavesurfer] = useState<any>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const data = await toJSON(
          get({
            apiName: 'myAPI',
            path: `/Listening/audio`,
          }),
        );
        setAudioUrl(data.url);
        setLoading(false);
        initWavesurfer();
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    };

    const fetchParts = async () => {
      try {
        const data = await toJSON(
          get({
            apiName: 'myAPI',
            path: `/${section}/${sk}`,
          }),
        );
        setParts(data);
        setActivePart('part1');
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchAudio();
    fetchParts();
  }, [sk]);

  const initWavesurfer = () => {
    if (waveformRef.current) {
      const waveformOptions: WaveSurferParams = {
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        barWidth: 3,
        barGap: 3,
        height: 100,
        responsive: true,
        plugins: [
          // Add any desired plugins here
        ],
      };

      const ws = WaveSurfer.create(waveformOptions);
      ws.load(audioUrl);
      ws.on('play', () => {
        setAudioPlaying(true);
      });
      ws.on('pause', () => {
        setAudioPlaying(false);
      });
      ws.on('finish', () => {
        setAudioFinished(true);
      });
      setWavesurfer(ws);
    } else {
      console.error('Waveform container not found.');
    }
  };
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

      const result = await toJSON(
        post({
          apiName: 'myAPI',
          path: `/answers/${section}/${sk}`,
          options: {
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              studentAnswers: studentAnswers,
            },
          },
        }),
      );

      console.log(result);

      console.log('Scores:', result.scores);
      console.log(result.europeanFrameworkGrade);
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
      <p hidden>{audioUrl}</p>
      <ExamsHeader duration={60} />
      <div className="Listening-part-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          audioUrl && (
            <div className="audio-container">
              <div ref={waveformRef}></div>
              {!audioFinished && !audioPlaying && (
                <button onClick={() => wavesurfer.play()}>
                  Click to play listening audio
                </button>
              )}
            </div>
          )
        )}
        <div className="Listening-Questions-Part">
          <h1 className="part-number">{`Part ${parseInt(
            activePart.charAt(4),
          )}`}</h1>
          {isValidPartSelected &&
            parts[parseInt(activePart.charAt(4)) - 1].Questions.map(
              (question: Question, questionIndex: number) => (
                <div key={questionIndex} className="question-container">
                  <h2 className="question-num">{`Question ${
                    questionIndex + 1
                  }`}</h2>
                  <p className="question">{question.Question}</p>
                  {question.QuestionType === 'Summary Completion' ? (
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
                    <p>Unsupported question type</p>
                  )}
                </div>
              ),
            )}
        </div>
      </div>

      <div className="reading-part-buttons">
        {parts.map((_part: ListeningPart, partIndex: number) => (
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

export default ListeningQuestionsPage;
