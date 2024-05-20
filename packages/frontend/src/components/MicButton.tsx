import { useState } from 'react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { useMicRecorder } from './useMicRecorder';

type MicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MicButton: React.FC<MicButtonProps> = ({
  className,
  ...props
}) => {
  const { isRecording, startRecording, stopRecording, audioURL } =
    useMicRecorder();
  const [isOn, setOn] = useState(false);
  const size = 28;

  const icon = isOn ? (
    <BsFillMicFill size={size} />
  ) : (
    <BsFillMicMuteFill size={size} />
  );
  const style = isOn ? 'bg-red-400' : 'bg-white';

  return (
    <>
      <button
        {...props}
        className={`${className} inline-block ${style} p-4 rounded-full border-2 transition-all duration-200`}
        onClick={() => {
          setOn(x => !x);
          isRecording ? stopRecording() : startRecording();
        }}
      >
        {icon}
      </button>
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </>
  );
};
