import { Nav } from '../components/Nav';
import Button from '../components/FButton';
import { useState, useEffect } from 'react';
import { sections } from './Questions';
import { post } from 'aws-amplify/api';

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
  question: string;
  chosen: string;
  correct: string;
}

const optionsStyle =
  'bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';

const PlacementTest = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sectionScore, setSectionScore] = useState(0);
  const [level, setLevel] = useState('');
  const [sectionSummary, setSectionSummary] = useState<Selected[]>([]);
  const [resultHandled, setResultHandled] = useState(false); // New state

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
    } else {
      handleResult(); // Call handleResult before showing the result
    }
  };

  const handleResult = async () => {
    console.log('handleResult function started');
    let updatedScore = sectionScore;

    if (score >= 5) {
      updatedScore += 1;
    }

    console.log('Calculated updatedScore:', updatedScore);

    if (updatedScore < 2) {
      setLevel('A1');
      console.log('Level set to A1');
    } else if (updatedScore === 2) {
      setLevel('A2');
      console.log('Level set to A2');
    } else if (updatedScore === 3) {
      setLevel('B1');
      console.log('Level set to B1');
    } else if (updatedScore === 4) {
      setLevel('B2');
      console.log('Level set to B2');
    } else if (updatedScore === 5) {
      setLevel('C1');
      console.log('Level set to C1');
    } else if (updatedScore === 6) {
      setLevel('C2');
      console.log('Level set to C2');
    }
    console.log('Invoking Lambda function via API.post');

    try {
      console.log('Invoking Lambda function via API.post');
      const response = await post({
        apiName: 'myAPI',
        path: '/addPlan',
        options: {
          body: {
            planType: 'vocab',
          },
        },
      });

      console.log('Response from Lambda:', response);
    } catch (error) {
      console.error('There was a problem with the API operation:', error);
    }

    setResultHandled(true); // Mark result as handled
    setShowResult(true); // Show the result after handling it
  };

  useEffect(() => {
    if (showResult && !resultHandled) {
      handleResult();
    }
  }, [showResult, resultHandled]);

  return (
    <main className="bg-[#FBF9F1] h-full min-h-screen">
      <Nav />
      {showResult ? (
        <section className="w-full flex items-center h-1/3 flex-col gap-y-48">
          <div className="w-1/2 flex flex-col gap-10">
            <h1 className="text-6xl font-extrabold">Your Level is</h1>
            <img
              src={`assets/Levels/${level}.png`}
              alt={`${level} CEFR Level`}
              className=" size-1/2"
            />
          </div>
        </section>
      ) : (
        <section className="w-full flex items-center h-3/4 flex-col justify-center">
          {showFeedback ? (
            <div className="w-1/2 flex flex-col gap-10">
              <div>
                <h1 className="text-4xl font-bold">Section Result</h1>
              </div>
              {sectionSummary.map((summary, index) => (
                <div key={index}>
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {summary.question}
                    </h2>
                    <h4 className="text-lg">Your Choice: {summary.chosen}</h4>
                    <h4 className="text-lg">
                      Correct Answer: {summary.correct}
                    </h4>
                  </div>
                </div>
              ))}

              {score >= 5 && currentSection + 1 <= sections.length ? (
                <div className="w-1/2" onClick={handleNextSection}>
                  <Button label="Next Section" tag="3B828E" />
                </div>
              ) : (
                <div className="w-1/2" onClick={() => setShowResult(true)}>
                  <Button label="Show Result" tag="3B828E" />
                </div>
              )}
            </div>
          ) : (
            <div className="w-1/2 flex flex-col items-center rounded-xl">
              <h3 className="font-bold text-4xl pb-12">
                {sections[currentSection - 1][currentQuestion].text}
              </h3>
              <h5 className="font-bold text-2xl pb-12">
                {sections[currentSection - 1][currentQuestion].sub}
              </h5>
              <div className="flex flex-row w-full flex-wrap justify-between">
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
          )}
        </section>
      )}
    </main>
  );
};

export default PlacementTest;
