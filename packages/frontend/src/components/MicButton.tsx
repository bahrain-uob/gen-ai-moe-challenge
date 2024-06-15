import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

interface MicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onStart: () => void;
  onStop: () => void;
  isRecording: boolean;
  disabled?: boolean;
}

export const MicButton: React.FC<MicButtonProps> = ({
  className,
  onStart,
  onStop,
  isRecording,
  disabled = false,
  ...props
}) => {
  const size = 28;

  const icon = isRecording ? (
    <BsFillMicFill size={size} />
  ) : (
    <BsFillMicMuteFill size={size} />
  );
  const style = isRecording ? 'bg-red-400' : 'bg-white';
  const moreStyle = disabled ? 'opacity-50' : '';

  return (
    <button
      {...props}
      className={`${className} inline-block ${style} p-4 rounded-full
          border-2 ${moreStyle} transition-all duration-200`}
      onClick={() => {
        if (!disabled) {
          isRecording ? onStop() : onStart();
        }
      }}
    >
      {icon}
    </button>
  );
};
