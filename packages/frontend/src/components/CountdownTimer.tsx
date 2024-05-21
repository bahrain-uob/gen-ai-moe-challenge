import React, { useState, useEffect } from 'react';

interface Props {
  time: number; // Number of minutes for countdown
  onTimeUp?: () => void;
}

export const CountdownTimer: React.FC<Props> = ({ time, onTimeUp }) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    Math.floor((time - Date.now() + 60 * 60 * 1000) / 1000),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(r => {
        console.log({ r }, r <= 0, r === 1);
        if (r <= 0) {
          return 0;
        } else if (r === 1) {
          onTimeUp?.();
          return r - 1;
        } else {
          return r - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
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
