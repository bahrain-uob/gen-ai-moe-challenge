import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';

const buttonLabels = ['Listening', 'Speaking', 'Grammer & Vocabulary', 'Reading', 'Writing'] as const;
type ButtonLabel = typeof buttonLabels[number];

const Exercises: React.FC = () => {
  const [activeButton, setActiveButton] = useState<ButtonLabel>('Listening');

  const handleClick = (button: ButtonLabel) => {
    setActiveButton(button);
  };

  return (
    <main className="flex flex-col items-center gap-y-16">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">Study Plan</h1>
      </div>
      <div className='w-1/2 flex justify-between'>
        {buttonLabels.map((button) => (
          <Button 
            key={button} 
            variant={activeButton === button ? 'contained' : 'outlined'} 
            color='primary' 
            onClick={() => handleClick(button)}
          >
            <h1 className='font-semibold'>{button}</h1>
          </Button>
        ))}
      </div>
    </main>
  );
};

export default Exercises;

