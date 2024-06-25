import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Plan, CefrLevel } from '../utilities/planTypes';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const buttonLabels = [
  'Listening',
  'Speaking',
  'Grammer & Vocabulary',
  'Reading',
  'Writing',
] as const;
type ButtonLabel = (typeof buttonLabels)[number];

const plans: { [key in ButtonLabel]: Plan } = {
  Listening: {
    challenges: [
      { challengeId: 'listen1', isCompleted: false },
      { challengeId: 'listen2', isCompleted: false },
      { challengeId: 'listen3', isCompleted: false },
      { challengeId: 'listen4', isCompleted: false },
      { challengeId: 'listen5', isCompleted: false },
    ],
    level: 'B1' as CefrLevel,
  },
  Speaking: {
    challenges: [
      { challengeId: 'speak1', isCompleted: false },
      { challengeId: 'speak2', isCompleted: false },
      { challengeId: 'speak3', isCompleted: false },
    ],
    level: 'A2' as CefrLevel,
  },
  'Grammer & Vocabulary': {
    challenges: [],
    level: 'A2',
  },
  Reading: {
    challenges: [],
    level: 'A1' as CefrLevel,
  },
  Writing: {
    challenges: [],
    level: 'A1' as CefrLevel,
  },
};

const buttonsTheme = createTheme({
  palette: {
    primary: {
      main: '#3B828E',
      contrastText: '#ffffff',
    },
  },
});

const circleTheme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#3B828E', // Custom color for the active step
          },
          '&.Mui-completed': {
            color: '#3B828E', // Custom color for the completed step
          },
          color: 'gray', // Default color for the step (Not active)
        },
      },
    },
  },
});

const Exercises: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeButton, setActiveButton] = useState<ButtonLabel>('Listening');

  const handleClick = (button: ButtonLabel) => {
    setActiveButton(button);
  };
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const currentPlan = plans[activeButton];
  const currentChallenges = currentPlan.challenges.map(
    challenge => challenge.challengeId,
  );

  return (
    <main className="flex flex-col items-center gap-y-16">
      <div className="w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">
          Study Plan
        </h1>
      </div>
      <div className="w-1/2 flex justify-between">
        {buttonLabels.map(button => (
          <ThemeProvider theme={buttonsTheme}>
            <Button
              key={button}
              variant={activeButton === button ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleClick(button)}
            >
              <h1 className="font-semibold">{button}</h1>
            </Button>
          </ThemeProvider>
        ))}
      </div>
      {currentChallenges.length === 0 ? (
        <div className="w-1/2 border-2 min-h-52 flex flex-col items-center justify-center">
          <h1>You need to take Initial Test!</h1>
          <ThemeProvider theme={buttonsTheme}>
            <Button variant="contained" color="primary">
              Take Test
            </Button>
          </ThemeProvider>
        </div>
      ) : (
        <div className="w-1/2 border-2 min-h-52 flex justify-center items-center">
          <div className="w-5/6">
            <ThemeProvider theme={circleTheme}>
              <Stepper nonLinear activeStep={activeStep}>
                {currentChallenges.map((label, index) => (
                  <Step
                    key={label}
                    completed={currentPlan.challenges[index].isCompleted}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: '0.875rem', // Adjust font size
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: '3rem', // Adjust circle size
                      },
                    }}
                  >
                    <StepButton
                      color="inherit"
                      onClick={handleStep(index)}
                      sx={{
                        minHeight: '4rem', // Adjust button size (Not visible unless clicking)
                        minWidth: '4rem',
                      }}
                    ></StepButton>
                  </Step>
                ))}
              </Stepper>
            </ThemeProvider>
          </div>
        </div>
      )}
      <div className="w-1/2 m-10">
        {buttonLabels.map(button => entryTitle(button, 5))}
      </div>
      <div className="w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">
          What is it ?
        </h1>
      </div>
      <div className="flex flex-wrap w-3/4 justify-center gap-16">
        {buttonLabels.map(button => LevelCard(button, 'A1', 'Hello'))}
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
const LevelCard = (icon: string, level: string, description: string) => (
  <div className="flex items-center border-2 border-gray-200 p-4 rounded-lg bg-white shadow-md w-1/3">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200">
        {icon}
      </div>
    </div>
    <div className="flex-grow ml-4">
      <div className="text-4xl font-bold text-gray-800">{level}</div>
      <div className="text-gray-500 mt-1">{description}</div>
    </div>
  </div>
);
