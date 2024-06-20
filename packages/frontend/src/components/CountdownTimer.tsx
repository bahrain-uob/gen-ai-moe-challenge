import React, { useState, useEffect, useRef } from 'react';

type Props = {
  onTimeUp?: () => void;
} & (
  | {
      start_time: number;
    }
  | { duration: number }
);

export const CountdownTimer: React.FC<Props> = props => {
  const timerId = useRef<NodeJS.Timeout>();
  const [remainingTime, setRemainingTime] = useState<number>(
    'start_time' in props
      ? Math.floor((props.start_time - Date.now() + 60 * 60 * 1000) / 1000)
      : props.duration,
  );

  useEffect(() => {
    timerId.current = setInterval(() => {
      setRemainingTime(r => {
        if (r <= 0) {
          props.onTimeUp?.();
          clearInterval(timerId.current);
          return 0;
        } else {
          return r - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  return <span>{formatTime(remainingTime)}</span>;
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
};

const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};
