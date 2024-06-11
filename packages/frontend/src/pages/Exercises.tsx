import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

const buttonLabels = [
  'Listening',
  'Speaking',
  'Grammer & Vocabulary',
  'Reading',
  'Writing',
] as const;
type ButtonLabel = (typeof buttonLabels)[number];

const Challenges = ['Challenge 1', 'Challenge 2', 'Challenge 3' , 'Challenge 4' , 'Challenge 5'];

const Exercises: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeButton, setActiveButton] = useState<ButtonLabel>('Listening');

  const handleClick = (button: ButtonLabel) => {
    setActiveButton(button);
  };
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <main className="flex flex-col items-center gap-y-16">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">
          Study Plan
        </h1>
      </div>
      <div className="w-1/2 flex justify-between">
        {buttonLabels.map(button => (
          <Button
            key={button}
            variant={activeButton === button ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleClick(button)}
          >
            <h1 className="font-semibold">{button}</h1>
          </Button>
        ))}
      </div>
      <div className='w-1/2'>
      <Stepper nonLinear activeStep={activeStep}>
        {Challenges.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </div>
    </main>
  );
};

export default Exercises;
