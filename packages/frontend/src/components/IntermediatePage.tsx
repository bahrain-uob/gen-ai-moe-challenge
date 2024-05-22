import { Layout } from '../Layout';
import { CountdownTimer } from './CountdownTimer';

interface IntermediatePageProps {
  /* This determines whether the section was submitted or auto-submitted */
  status: 'Auto-Submitted' | 'Submitted';
  /* This is the section type */
  type: string;
  onContinue: () => void;
}

export const IntermediatePage: React.FC<IntermediatePageProps> = ({
  status,
  type,
  onContinue,
}) => {
  return type !== 'speaking' ? (
    <>
      <p>
        Your {type} section was {status}
      </p>
      <p>
        You have <CountdownTimer duration={120} onTimeUp={onContinue} /> minutes
        before the next section starts
      </p>
      <button onClick={onContinue}>Continue</button>
    </>
  ) : (
    "You have finished your test! Soon you'll be able to see your feedback!"
  );
};
