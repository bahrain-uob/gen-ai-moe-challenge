// import { WritingFeedback } from '../utilities';
// import CollapsableCard from './collapsableCard';

// export const WritingFeedbackContainer = ({
//   feedback,
// }: {
//   feedback: WritingFeedback;
// }) => {
//   const pClassname = 'whitespace-pre-line ml-4 mb-8';
//   const headingStyle = 'font-light mb-2';

//   let grammarMistakes = null;
//   if (feedback['Grammer Tool Feedback']) {
//     grammarMistakes = feedback['Grammer Tool Feedback'].map(
//       (mistake, index) => {
//         const context = mistake.context.text;
//         const before = context.substring(0, mistake.context.offset);
//         const inner = context.substring(
//           mistake.context.offset,
//           mistake.context.offset + mistake.context.length,
//         );
//         const after = context.substring(
//           mistake.context.offset + mistake.context.length,
//         );

//         let body = [];
//         for (let x in mistake) {
//           body.push(
//             <p key={x}>
//               {x.toString()}: {JSON.stringify(mistake[x])}
//             </p>,
//           );
//         }

//         const title = (
//           <>
//             <span>{before.trim()} </span>
//             <span className="bg-yellow-300">{inner.trim()}</span>
//             <span> {after.trim()}</span>
//           </>
//         );

//         return (
//           <CollapsableCard title={title} key={index}>
//             {body}
//           </CollapsableCard>
//         );
//       },
//     );
//   }

//   return (
//     <>
//       <h5 className={headingStyle}>Task Responce</h5>
//       <p className={pClassname}>{feedback['Task Responce']}</p>

//       <h5 className={headingStyle}>Coherence & Cohesion</h5>
//       <p className={pClassname}>{feedback['Coherence & Cohesion']}</p>

//       <h5 className={headingStyle}>Grammatical Range & Accuracy</h5>
//       <p className={pClassname}>{feedback['Grammatical Range & Accuracy']}</p>

//       <h5 className={headingStyle}>Lexical Resource</h5>
//       <p className={pClassname}>{feedback['Lexical Resource']}</p>

//       <h5 className={headingStyle}>Grammar Mistakes</h5>
//       {grammarMistakes && grammarMistakes.length !== 0 ? (
//         grammarMistakes
//       ) : (
//         <p className={pClassname}>No Mistakes Found</p>
//       )}

//       <h5 className={headingStyle}>Combined Feedback</h5>
//       <p className={pClassname}>{feedback['Combined Feedback']}</p>
//     </>
//   );
// };
