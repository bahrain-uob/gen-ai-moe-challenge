import { getEuropeanFrameworkGrade } from '../utilities/calculateFeedbackScore';
import {
  Feedback,
  SpeakingError,
  SpeakingFeedback,
  WritingError,
  WritingFeedback,
  WritingFeedbackSuccess,
} from '../utilities/types';
import { DoubleCircles } from './DoubleCirclesComponent';
import { ProgressBar } from './ProgressBar';
import CollapsableCard from './collapsableCard';

/** Display feedback for both writing and speaking */
export const WSFeedbackComponent = ({
  feedback,
}: {
  feedback: SpeakingFeedback | WritingFeedback;
}) => {
  const pClassname = 'whitespace-pre-line ml-4 mb-8';

  if (isError(feedback)) return <p>{feedback.error}</p>;

  const circularFeedback = (
    <DoubleCircles
      leftCircleProps={{
        value: feedback.score,
        maxValue: 9,
        // TODO Don't hard-code a band score
        text: getEuropeanFrameworkGrade(feedback.score),
      }}
      rightCircleProps={{
        value: feedback.score,
        maxValue: 9,
        text: feedback.score.toFixed() + ' / 9',
      }}
    />
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
    console.log(grammarMistakes)

  const textFeedback = entries.map(([title, { score, text }]) => (
    <CollapsableCard
      key={title}
      title={
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start w-full">
          <span className="font-light max-md:mb-2">{title}</span>
          <div className="w-1/2">
            <ProgressBar percentage={score / 9} isAnimated />
          </div>
        </div>
      }
    >
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

function isError(
  Feedback: SpeakingFeedback | WritingFeedback,
): Feedback is WritingError | SpeakingError {
  return (Feedback as WritingError | SpeakingError).error !== undefined;
}

const displayGrammarMistakes = (
  grammarMisktakes: WritingFeedbackSuccess['Grammer Tool Feedback'],
) => {
  console.log({ grammarMisktakes });
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

export function isWritingFeedback(
  feedback: SpeakingFeedback | WritingFeedback,
): feedback is WritingFeedback {
  return !('Pronunciation' in feedback);
}
