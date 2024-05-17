import { Feedback, SpeakingFeedback, WritingFeedback } from '../utilities';
import CollapsableCard from './collapsableCard';
import { CircularProgressbar } from 'react-circular-progressbar';
import { CircularProgressbarStyles } from 'react-circular-progressbar/dist/types';

/** Display feedback for both writing and speaking */
export const WSFeedbackComponent = ({
  feedback,
}: {
  feedback: SpeakingFeedback | WritingFeedback;
}) => {
  const pClassname = 'whitespace-pre-line ml-4 mb-8';

  /* Circular Progress */
  const cpStyles: CircularProgressbarStyles = {
    // Customize the root svg element
    root: {},
    // Customize the path, i.e. the "completed progress"
    path: {
      stroke: '#3B828E',
      strokeWidth: 8,
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      // Trail color
      stroke: '#AAD7D9',
      strokeWidth: 8,
    },
    // Customize the text
    text: {
      // Text size
      fontSize: '0.95rem',
    },
  };

  const circularFeedback = (
    <div className="flex justify-evenly mb-20">
      <div className="w-1/6 max-md:w-1/3">
        <p className="text-center mb-6">Band Score</p>
        <CircularProgressbar
          value={feedback.score * 4}
          maxValue={36}
          // TODO Don't hard-code a band score
          text={'B1'}
          styles={cpStyles}
        />
      </div>
      <div className="w-1/6 max-md:w-1/3">
        <p className="text-center mb-6">Total Score</p>
        <CircularProgressbar
          value={feedback.score * 4}
          maxValue={36}
          text={(feedback.score * 4).toFixed() + ' / 36'}
          styles={cpStyles}
        />
      </div>
    </div>
  );

  /* Text Progress */
  // Contains header and feedback in correct order
  const entries: [string, Feedback][] = isWritingFeedback(feedback)
    ? [
        ['Task Responce', feedback['Task Responce']],
        ['Coherence & Cohesion', feedback['Coherence & Cohesion']],
        ['Lexical Resource', feedback['Lexical Resource']],
        [
          'Grammatical Range & Accuracy',
          feedback['Grammatical Range & Accuracy'],
        ],
      ]
    : [
        ['Fluency & Coherence', feedback['Fluency & Coherence']],
        ['Lexical Resource', feedback['Lexical Resource']],
        [
          'Grammatical Range & Accuracy',
          feedback['Grammatical Range & Accuracy'],
        ],
        ['Pronunciation', feedback['Pronunciation']],
      ];

  const grammarMistakes = isWritingFeedback(feedback)
    ? displayGrammarMistakes(feedback['Grammer Tool Feedback'])
    : null;

  const textFeedback = entries.map(([title, { score, text }]) => (
    <CollapsableCard key={title} title={entryTitle(title, score)}>
      <p className={pClassname}>{text}</p>

      {/* Display grammar mistakes under grammatical range */}
      {title === 'Grammatical Range & Accuracy' && grammarMistakes}
    </CollapsableCard>
  ));

  return (
    <>
      {circularFeedback}
      {textFeedback}
    </>
  );
};

const entryTitle = (title: string, score: number) => (
  <>
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start w-full">
      <span className="font-light max-md:mb-2">{title}</span>
      {/* <div className="w-1/2 bg-blue-1 h-full"></div> */}
      <div className="bg-blue-1 flex w-1/2 max-md:w-full rounded-xl">
        <div
          className="bg-blue-4 inline-block h-4 rounded-xl"
          style={{ width: ((score / 9) * 100).toFixed(2) + '%' }}
        ></div>
      </div>
      {/* <div className="w-1/2 bg-blue-1">
        <div
          className="inline-block bg-blue-4 h-4 mr-4"
          style={{ width: (score / 9) * 100 + '%' }}
        ></div>
      </div> */}
    </div>
  </>
);

const displayGrammarMistakes = (
  grammarMisktakes: WritingFeedback['Grammer Tool Feedback'],
) => {
  console.log(grammarMisktakes);
  if (!grammarMisktakes) return;

  return grammarMisktakes.map((mistake, index) => {
    const context = mistake.context.text;
    const before = context.substring(0, mistake.context.offset);
    const inner = context.substring(
      mistake.context.offset,
      mistake.context.offset + mistake.context.length,
    );
    const after = context.substring(
      mistake.context.offset + mistake.context.length,
    );

    let body = [];
    for (let x in mistake) {
      body.push(
        <p key={x}>
          {x.toString()}: {JSON.stringify(mistake[x])}
        </p>,
      );
    }

    const title = (
      <>
        <span>{before.trim()} </span>
        <span className="bg-yellow-300">{inner.trim()}</span>
        <span> {after.trim()}</span>
      </>
    );

    return (
      <CollapsableCard title={title} key={index}>
        {body}
      </CollapsableCard>
    );
  });
};

function isWritingFeedback(
  feedback: SpeakingFeedback | WritingFeedback,
): feedback is WritingFeedback {
  return !('Pronunciation' in feedback);
}
