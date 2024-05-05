import Nav from '../components/Nav';
import Button from '../components/FButton';
import { useState } from 'react';

const optionsStyle =
  'bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';

const PlacementTest = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

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
    section: number;
    question: string;
    chosen: string;
    correct: string;
  }

  const sections: Question[][] = [
    // Section 1
    [
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
          { id: 1, text: 'rains', isCorrect: false },
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
    ],
    // Section 2
    [
      {
        text: 'They ________ ________ with Jackson in the conference room.',
        options: [
          { id: 0, text: 'are met', isCorrect: false },
          { id: 1, text: 'were meet', isCorrect: false },
          { id: 2, text: 'are meeting', isCorrect: true },
          { id: 3, text: 'are meet', isCorrect: false },
        ],
      },
      {
        text: 'Where will the picnic take place? \n Picnic this Saturday in Green Forest Park \n Time: 3:00 - 6:00pm \nDon’t miss the: \n-fireworks \n-live music \n-delicious food',
        options: [
          { id: 0, text: 'live music', isCorrect: false },
          { id: 1, text: '3:00 - 6:00pm', isCorrect: false },
          { id: 2, text: 'Green Forest Park', isCorrect: true },
          { id: 3, text: 'Saturday', isCorrect: false },
        ],
      },
      {
        text: 'Which word is correct in all three sentences?\n1. We ________ on pretty well in the office.\n2. Where did you ________ those shoes?\n3. Don’t ________ up! I will get the phone.',
        options: [
          { id: 0, text: 'get', isCorrect: true },
          { id: 1, text: 'go', isCorrect: false },
          { id: 2, text: 'live', isCorrect: false },
          { id: 3, text: 'find', isCorrect: false },
        ],
      },
      {
        text: 'Which sentence is NOT correct?',
        options: [
          { id: 0, text: 'They are working quickly today.', isCorrect: false },
          { id: 1, text: 'Sophia drove slowly to work.', isCorrect: false },
          { id: 2, text: 'You are singing happily.', isCorrect: false },
          { id: 3, text: 'He fell hardly to the ground.', isCorrect: true },
        ],
      },
      {
        text: 'Harry ________ sleeping when his boss called.',
        options: [
          { id: 0, text: 'were', isCorrect: false },
          { id: 1, text: 'was', isCorrect: true },
          { id: 2, text: 'is', isCorrect: false },
          { id: 3, text: "isn't", isCorrect: false },
        ],
      },
      {
        text: 'Did you go to the store? There isn’t _________ cereal left.',
        options: [
          { id: 0, text: 'some', isCorrect: false },
          { id: 1, text: 'many', isCorrect: true },
          { id: 2, text: 'alot', isCorrect: false },
          { id: 3, text: 'much', isCorrect: true },
        ],
      },
      {
        text: 'If you forget to bring your lunch, _______________.',
        options: [
          { id: 0, text: 'you are hungry', isCorrect: false },
          { id: 1, text: "you wouldn't eat", isCorrect: false },
          { id: 2, text: 'you will be hungry', isCorrect: false },
          { id: 3, text: 'you shouldn’t eat', isCorrect: true },
        ],
      },
    ],
  ];

  const [sectionSummary, setSectionSummary] = useState<Selected[]>([]);

  const optionClicked = (text: string) => {
    const correctAnswer =
      sections[currentSection - 1][currentQuestion].options.find(
        option => option.isCorrect,
      )?.text || '';
    const question = sections[currentSection - 1][currentQuestion].text;

    setSectionSummary(prev => [
      ...prev,
      {
        section: currentSection,
        question,
        chosen: text,
        correct: correctAnswer,
      },
    ]);

    if (currentQuestion + 1 < sections[currentSection - 1].length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const handleNextSection = () => {
    if (currentSection + 1 <= sections.length) {
      setCurrentSection(currentSection + 1); // Move to the next section
      setCurrentQuestion(0); // Start from the first question
      setSectionSummary([]); // Clear the summary array
      setShowFeedback(false); // Hide the feedback section
    } else {
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
            <div className="w-1/2" onClick={handleNextSection}>
              <Button label="Next Section" tag="3B828E" />
            </div>
          </div>
        ) : (
          <div className="w-1/2 flex flex-col items-center rounded-xl">
            <h3 className="font-bold text-4xl pb-12">
              {sections[currentSection - 1][currentQuestion].text}
            </h3>
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
    </main>
  );
};

export default PlacementTest;
