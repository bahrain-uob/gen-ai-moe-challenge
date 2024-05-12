import { Feedback, SpeakingFeedback, WritingFeedback } from '../utilities';
import CollapsableCard from './collapsableCard';

/** Display feedback for both writing and speaking questions */
export const WSFeedbackComponent = ({
  feedback,
}: {
  feedback: SpeakingFeedback | WritingFeedback;
}) => {
  const pClassname = 'whitespace-pre-line ml-4 mb-8';

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

  return entries.map(([title, { score, text }]) => (
    <CollapsableCard title={entryTitle(title, score)}>
      <p className={pClassname}>{text}</p>

      {/* Display grammar mistakes under grammatical range */}
      {title === 'Grammatical Range & Accuracy' && grammarMistakes}
    </CollapsableCard>
  ));
};

const entryTitle = (title: string, score: number) => {
  return <span className="font-light">{title}</span>;
};

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
