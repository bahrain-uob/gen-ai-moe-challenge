import Nav from '../components/Nav';
import Button from '../components/FButton';
import { useState } from 'react';

const optionsStyle =
  'bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';

const PlacementTest = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
  }

  interface Question {
    text: string;
    options: Option[];
  }

  interface Selected {
    question: string;
    chosen: string;
    correct: string;
  }

  const section1: Question[] = [
    {
      text: '________ did you do today?',
      options: [
        { id: 0, text: 'What', isCorrect: true },
        { id: 1, text: 'Who', isCorrect: false },
        { id: 2, text: 'Where', isCorrect: false },
        { id: 3, text: 'When', isCorrect: false },
      ],
    },
    {
      text: 'She ________ a doctor.',
      options: [
        { id: 0, text: 'are', isCorrect: false },
        { id: 1, text: 'am', isCorrect: false },
        { id: 2, text: 'is', isCorrect: true },
        { id: 3, text: 'were', isCorrect: false },
      ],
    },
    {
      text: 'We ________ basketball every day.',
      options: [
        { id: 0, text: 'plays', isCorrect: false },
        { id: 1, text: 'play', isCorrect: true },
        { id: 2, text: 'playing', isCorrect: false },
        { id: 3, text: 'players', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is correct?',
      options: [
        { id: 0, text: 'Jerry can’t cook well.', isCorrect: true },
        { id: 1, text: 'Jerry cook can’t well.', isCorrect: false },
        { id: 2, text: 'Can’t Jerry cook well.', isCorrect: false },
        { id: 3, text: 'Jerry can’t well cook.', isCorrect: false },
      ],
    },
    {
      text: 'How ________ does the book cost?',
      options: [
        { id: 0, text: 'many', isCorrect: false },
        { id: 1, text: 'money', isCorrect: false },
        { id: 2, text: 'pay', isCorrect: false },
        { id: 3, text: 'much', isCorrect: true },
      ],
    },
    {
      text: 'It is ________ today. There is no sun.',
      options: [
        { id: 0, text: 'rain', isCorrect: false },
        { id: 1, text: 'rains', isCorrect: true },
        { id: 2, text: 'rainy', isCorrect: true },
        { id: 3, text: 'rainings', isCorrect: false },
      ],
    },
    {
      text: 'Which sentence is correct?',
      options: [
        { id: 0, text: 'Mum is right now at the shops.', isCorrect: false },
        { id: 1, text: 'Mum at the shops is right now.', isCorrect: false },
        { id: 2, text: 'Right now at the shops is Mum.', isCorrect: false },
        { id: 3, text: 'Mum is at the shops right now.', isCorrect: true },
      ],
    },
  ];

  const [sectionSummary, setSectionSummary] = useState<Selected[]>([]);

  const optionClicked = (text: string) => {
    const correctAnswer =
      section1[currentQuestion].options.find(option => option.isCorrect)
        ?.text || '';
    const question = section1[currentQuestion].text;
    setSectionSummary(prev => [
      ...prev,
      { question, chosen: text, correct: correctAnswer },
    ]);

    if (currentQuestion + 1 < section1.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFeedback(true);
    }
  };

  return (
    <main>
      <Nav />
      <section className="w-full flex items-center h-1/3 flex-col gap-y-36">
        {showFeedback ? (
          <div className="w-1/2 flex flex-col gap-10">
            <div>
              <h1 className="text-4xl font-bold">Section Result</h1>
            </div>
            {sectionSummary.map((summary, index) => (
              <div key={index}>
                <div>
                  <h2 className="text-2xl font-semibold">{summary.question}</h2>
                  <h4 className="text-lg">Your Choice: {summary.chosen}</h4>
                  <h4 className="text-lg">Correct Answer: {summary.correct}</h4>
                </div>
              </div>
            ))}
            <div className="w-1/2">
              <Button label="Next Section" tag="3B828E" />
            </div>
          </div>
        ) : (
          <div className="w-1/2 flex flex-col items-center rounded-xl">
            <h3 className="font-bold text-4xl pb-12">
              {section1[currentQuestion].text}
            </h3>
            <div className="flex flex-row w-full flex-wrap justify-between">
              {section1[currentQuestion].options.map(option => {
                return (
                  <div
                    key={option.id}
                    className={optionsStyle}
                    onClick={() => optionClicked(option.text)}
                  >
                    {option.text}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default PlacementTest;
