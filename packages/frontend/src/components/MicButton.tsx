import { useState } from 'react';
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
  const [isOn, setOn] = useState(false);
  const size = 28;

  const icon = isOn ? (
    <BsFillMicFill size={size} />
  ) : (
    <BsFillMicMuteFill size={size} />
  );
  const style = isOn ? 'bg-red-400' : 'bg-white';
  const moreStyle = disabled ? 'opacity-50' : '';

  return (
    <button
      {...props}
      className={`${className} inline-block ${style} p-4 rounded-full
          border-2 ${moreStyle} transition-all duration-200`}
      onClick={() => {
        if (!disabled) {
          setOn(x => !x);
          isRecording ? onStop() : onStart();
        }
      }}
    >
      {icon}
    </button>
  );
};
