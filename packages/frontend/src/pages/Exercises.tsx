import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import {Plan , CefrLevel} from '../utilities/planTypes';

const buttonLabels = [
  'Listening',
  'Speaking',
  'Grammer & Vocabulary',
  'Reading',
  'Writing',
] as const;
type ButtonLabel = (typeof buttonLabels)[number];

const listeningPlan: Plan = {
  challenges: [
    {
      challengeId: 'listen1',
      isCompleted: false,
    },
    {
      challengeId: 'listen2',
      isCompleted: false,
    },
    {
      challengeId: 'listen3',
      isCompleted: false,
    },
    {
      challengeId: 'listen4',
      isCompleted: false,
    },
    {
      challengeId: 'listen5',
      isCompleted: false,
    },
  ],
  level: 'B1' as CefrLevel,
};

const LChallenges = listeningPlan.challenges.map(challenge=>challenge.challengeId);

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
        {LChallenges.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </div>
      <div className='w-1/2 m-10'>
      {buttonLabels.map(button => entryTitle(button, 5))}
      </div>
      <div className="w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">
          What is it ?
        </h1>
      </div>
    </main>
  );
};

export default Exercises;

const entryTitle = (title: string, score: number) => (
  <>
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start w-full">
      <span className="font-light max-md:mb-2">{title}</span>
      {/* <div className="w-1/2 bg-blue-1 h-full"></div> */}
      <div className="bg-blue-1 flex w-1/2 max-md:w-full rounded-xl">
        <div
          className="bg-blue-4 inline-block h-4 rounded-xl"
          style={{ width: ((score / 9) * 100).toFixed(2) + '%' }}
        ></div>
      </div>
      {/* <div className="w-1/2 bg-blue-1">
        <div
          className="inline-block bg-blue-4 h-4 mr-4"
          style={{ width: (score / 9) * 100 + '%' }}
        ></div>
      </div> */}
    </div>
  </>
);