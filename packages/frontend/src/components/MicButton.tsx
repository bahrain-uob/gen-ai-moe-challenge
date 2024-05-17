import { useState } from 'react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

type MicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MicButton: React.FC<MicButtonProps> = ({
  className,
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

  return (
    <button
      {...props}
      className={`${className} inline-block ${style} p-4 rounded-full border-2 transition-all duration-200`}
      onClick={() => setOn(x => !x)}
    >
      {icon}
    </button>
  );
};
