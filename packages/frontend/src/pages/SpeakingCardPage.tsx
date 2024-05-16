import { MicButton } from '../components/MicButton';

export const SpeakingCardPage = () => {
  const q = {
    task: {
      text: 'Describe your favorite shopping center.',
    },
    questions: [
      'Where is this center?',
      'What is special about it?',
      'What do you do when you go there?',
      'What do people say about it?',
      'Explain why you think it is a good choice.',
    ],
  };

  const cardContent = (
    <>
      <h3 className="font-light text-lg mb-3">{q.task.text}</h3>
      <ul className="list-inside ml-4">
        {q.questions.map((question, index) => (
          <li key={index} className="list-disc mb-1">
            {question}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <div className="flex flex-col justify-between items-center h-svh">
        <div className="w-full max-w-xl h-60 bg-white rounded-xl shadow-backdrop py-4 px-6">
          {cardContent}
        </div>
        <MicButton className="shadow-backdrop" />
      </div>
    </>
  );
};
