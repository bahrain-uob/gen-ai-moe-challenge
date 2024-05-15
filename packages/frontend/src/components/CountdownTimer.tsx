import React, { useState, useEffect } from 'react';

interface Props {
  minutes: number; // Number of minutes for countdown
 
}

const CountdownTimer: React.FC<Props> = ({ minutes }) => {
  const [remainingTime, setRemainingTime] = useState<number>(minutes * 60); // Convert minutes to seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="remaining-time">
      {formatTime(remainingTime)} min
    </div>
  );
};

export default CountdownTimer;