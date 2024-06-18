import Button from '../components/FButton';
import { useState } from 'react';
import { sections } from './Questions';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { ProgressBar } from '../components/ProgressBar';

export interface Question {
  text: string;
  sub: string;
  options: Option[];
}

export interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Selected {
  section: number;
  questionIndex: number;
  question: string;
  chosen: string;
  correct: string;
}

const optionsStyle =
  'bg-white border border-gray-300 p-2 text-black text-lg my-4  hover:cursor-pointer hover:bg-gray-300';

const PlacementTest = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sectionScore, setSectionScore] = useState(0);
  const [level, setLevel] = useState('');
  const [sectionSummary, setSectionSummary] = useState<Selected[]>([]);

  const optionClicked = (text: string) => {
    const currentSectionQuestions = sections[currentSection - 1];
    const currentQuestionObj = currentSectionQuestions[currentQuestion];
    const correctAnswer =
      currentQuestionObj.options.find(option => option.isCorrect)?.text || '';
    const question = currentQuestionObj.text;

    const isCorrect = text === correctAnswer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1); // Increment score if the answer is correct
    }

    setSectionSummary(prev => [
      ...prev,
      {
        section: currentSection,
        questionIndex: currentQuestion,
        question,
        chosen: text,
        correct: correctAnswer,
        isCorrect,
      },
    ]);

    if (currentQuestion + 1 < currentSectionQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const handleNextSection = () => {
    if (currentSection + 1 <= sections.length) {
      setSectionScore(sectionScore + 1);
      setCurrentSection(currentSection + 1); // Move to the next section
      setScore(0);
      setCurrentQuestion(0); // Start from the first question
      setSectionSummary([]); // Clear the summary array
      setShowFeedback(false); // Hide the feedback section
    }
  };
  const handleResult = () => {
    let updatedScore = sectionScore;

    if (score >= 5) {
      updatedScore += 1;
    }

    if (updatedScore < 2) {
      setLevel('A1');
    } else if (updatedScore === 2) {
      setLevel('A2');
    } else if (updatedScore === 3) {
      setLevel('B1');
    } else if (updatedScore === 4) {
      setLevel('B2');
    } else if (updatedScore === 5) {
      setLevel('C1');
    } else if (updatedScore === 6) {
      setLevel('C2');
    }

    setShowResult(true);
  };

  const progressPercentage =
    (currentQuestion + 1) / sections[currentSection - 1].length;

  return (
    <main className="bg-[#FBF9F1] h-full min-h-screen">
      {showResult ? (
        <section className="w-full flex items-center h-1/3 flex-col gap-y-10 ">
          <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col items-center gap-10 p-8  ">
            <h1 className="text-3xl">Your current Level is</h1>
            <img
              src={`assets/Levels/${level}.png`}
              alt={`${level} CEFR Level`}
              className="w-1/2 h-auto"
            />
          </div>
          <Button label="Continue" tag="3B828E"></Button>
        </section>
      ) : (
        <section className="w-full flex items-center h-3/4 flex-col justify-center">
          {showFeedback ? (
            <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col gap-5 ">
              <div>
                <h1 className="text-3xl mb-10">Section Result</h1>
              </div>
              {sectionSummary.map((summary, index) => {
                const isCorrect = summary.chosen === summary.correct;
                const currentQuestionObj =
                  sections[summary.section - 1][summary.questionIndex];

                console.log('Summary:', summary);
                console.log('Current Question Obj:', currentQuestionObj);
                return (
                  <div key={index}>
                    <div className="bg-white border py-4 px-4 ">
                      <div className="flex items-center">
                        {isCorrect ? (
                          <BsCheckCircleFill className="text-teal-500 inline-block " />
                        ) : (
                          <BsXCircleFill className="text-red-500 inline-block " />
                        )}
                        <h1 className="text-lg font-bold ml-2">
                          Question {summary.questionIndex + 1}{' '}
                        </h1>
                      </div>
                      <h2 className="text-md mt-3 mb-5">{summary.question}</h2>

                      {currentQuestionObj &&
                        currentQuestionObj.options.map(option => (
                          <div
                            key={option.id}
                            className={`text-lg border  p-2 mt-3 ${
                              option.text === summary.correct
                                ? 'border-teal-500 border-2'
                                : option.text === summary.chosen
                                ? 'border-red-500 border-2'
                                : 'border-gray-400 text-gray-400'
                            }`}
                          >
                            {option.text}
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}

              {score >= 5 && currentSection + 1 <= sections.length ? (
                <div className="w-1/2" onClick={handleNextSection}>
                  <Button label="Next Section" tag="3B828E" />
                </div>
              ) : (
                <div className="w-1/2" onClick={handleResult}>
                  <Button label="Show Result" tag="3B828E" />
                </div>
              )}
            </div>
          ) : (
            <>
              <div
                className="w-full sm:w-3/4 md:w-1/2  bg-white flex flex-col  border p-10"
                key={`Placement-Question-${currentQuestion}`}
              >
                <h2 className="text-2xl md:text-3xl  pb-8 font-semiboldb text-center text-blue-4">
                  Placment Test
                </h2>

                <h3 className="text-xl  pt-8 ">
                  {currentQuestion + 1} .{' '}
                  {sections[currentSection - 1][currentQuestion].text}
                </h3>
                <h5 className="text-lg pt-4 pb-8">
                  {sections[currentSection - 1][currentQuestion].sub}
                </h5>

                <div className="">
                  {sections[currentSection - 1][currentQuestion].options.map(
                    option => {
                      return (
                        <div
                          key={option.id}
                          className={optionsStyle}
                          onClick={() => optionClicked(option.text)}
                        >
                          {option.text}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="w-full sm:w-3/4 md:w-1/2  bg-white flex items-center border p-5 mt-5">
                <ProgressBar percentage={progressPercentage}></ProgressBar>
                <span className="text-gray-500 text-sm ml-3">
                  {currentQuestion + 1}/7
                </span>
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
};

export default PlacementTest;
