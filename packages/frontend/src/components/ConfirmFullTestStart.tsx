import { MouseEventHandler } from 'react';

interface ConfirmFullTestStartProps {
  onConfirm: MouseEventHandler;
}

export const ConfirmFullTestStart: React.FC<ConfirmFullTestStartProps> = ({
  onConfirm,
}) => {
  return (
    <div>
      <p>Are you sure you want to start?</p>
      <button onClick={onConfirm}> Yes </button>
    </div>
  );
};
