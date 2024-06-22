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
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-center font-bold text-3xl mb-4">
          Your {type} section was {status}
        </p>
        <p className="text-center text-xl mb-4 mt-4">
          You have <CountdownTimer duration={120} onTimeUp={onContinue} />{' '}
          minutes before the next section starts
        </p>
        <button
          className="bg-blue-4 text-white px-4 py-2 rounded hover:bg-blue-3 my-10"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </>
  ) : (
    "You have finished your test! You'll be able to see your feedback in a minute!"
  );
};
