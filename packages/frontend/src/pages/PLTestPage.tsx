import { Option, Question } from './PlacementTest';
import { sections as questions } from './Questions';

export const PLTestPage = () => {
  const rQuestion = getRandomQuestion();

  return <RenederQuestion question={rQuestion} handleClick={console.log} />;
};

const optionsStyle =
  'bg-[#3B828E] rounded-md p-2 text-white text-xl font-semibold w-1/3 mx-10 my-1 h-16 flex items-center hover:cursor-pointer hover:bg-[#2F6A75] duration-300';
const RenederQuestion = ({
  question,
  handleClick,
}: {
  question: Question;
  handleClick: (option: Option, question: Question) => void;
}) => (
  <div className="w-1/2 flex flex-col items-center rounded-xl">
    <h3 className="font-bold text-4xl pb-12">{question.text}</h3>
    <h5 className="font-bold text-2xl pb-12">{question.sub}</h5>
    <div className="flex flex-row w-full flex-wrap justify-between">
      {question.options.map(option => {
        return (
          <div
            key={option.id}
            className={optionsStyle}
            onClick={() => handleClick(option, question)}
          >
            {option.text}
          </div>
        );
      })}
    </div>
  </div>
);

// function optionClicked(text: any): void {
//   throw new Error('Function not implemented.');
// }

const getRandomQuestion = () => {
  const qArray = questions[Math.floor(Math.random() * questions.length)];
  const question = qArray[Math.floor(Math.random() * qArray.length)];
  return question;
};
