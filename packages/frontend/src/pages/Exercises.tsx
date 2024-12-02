import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Plan, CefrLevel } from '../utilities/planTypes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';

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
      { challengeId: 'listen2', isCompleted: true },
      { challengeId: 'listen3', isCompleted: false },
      { challengeId: 'listen4', isCompleted: false },
      { challengeId: 'listen5', isCompleted: false },
    ],
    level: 'B1' as CefrLevel,
  },
  Speaking: {
    challenges: [
      { challengeId: 'speak1', isCompleted: true },
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

const sectionDescriptions: {
  [key in ButtonLabel]: { [key in CefrLevel]: string };
} = {
  Listening: {
    A1: 'You can understand familiar words and very basic phrases when people speak slowly and clearly.',
    A2: 'You can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g., personal and family information, shopping, local geography, employment).',
    B1: 'You can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc.',
    B2: 'You can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in your field of specialization.',
    C1: 'You can understand a wide range of demanding, longer spoken material, even if it is delivered at fast speed and includes idiomatic expressions.',
    C2: 'You can effortlessly understand virtually everything heard, whether live or recorded, including fast speech delivered in difficult contexts, such as technical discussions or academic lectures.',
  },
  Speaking: {
    A1: 'You can use simple greetings and short exchanges when meeting someone new. ',
    A2: 'You can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters.',
    B1: 'You can deal with most situations likely to arise while traveling in an area where the language is spoken. You can produce simple connected text on topics which are familiar or of personal interest.',
    B2: 'You can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.',
    C1: 'You can express yourself fluently and spontaneously without much obvious searching for expressions. You can use language flexibly and effectively for social, academic, and professional purposes.',
    C2: 'You can express yourself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in the most complex situations. You can effortlessly participate in any conversation or discussion, however demanding.',
  },
  'Grammer & Vocabulary': {
    A1: 'A1 Grammer & Vocabulary',
    A2: 'A2 Grammer & Vocabulary',
    B1: 'B1 Grammer & Vocabulary',
    B2: 'B2 Grammer & Vocabulary',
    C1: 'C1 Grammer & Vocabulary',
    C2: 'C2 Grammer & Vocabulary',
  },
  Reading: {
    A1: 'You can understand very short and simple texts, like greetings, signs, or labels.',
    A2: 'You can understand very short, simple texts related to everyday life',
    B1: 'You can understand the main points of clear standard input on familiar and frequently encountered matters related to work, school, leisure, etc. You can understand the description of events, feelings and wishes in personal letters.',
    B2: 'You can read a wide range of demanding, longer texts, and understand implicit meaning.',
    C1: 'You can understand a wide range of demanding, longer written text, and recognize implicit meaning.',
    C2: 'You can read with ease virtually any kind of written text, including abstract, complex literary works, technical manuals, or philosophical treatises. You can grasp implicit meanings and subtle nuances.',
  },
  Writing: {
    A1: 'You can write short, simple phrases and personal details about yourself, like your name, where you live, and things you have.',
    A2: 'You can write short, simple connected text on topics that are familiar or of personal interest.',
    B1: 'You can write simple connected text on topics which are familiar or of personal interest. You can write personal letters describing experiences and impressions.',
    B2: 'You can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.',
    C1: 'You can write clear, detailed text on a wide range of subjects and explain a viewpoint on a complex issue giving the advantages and disadvantages of various options.',
    C2: 'You can produce clear, well-structured and detailed text on complex subjects, showing controlled use of cohesive devices, paragraphing, and register variation. You can write persuasive arguments or imaginative narratives.',
  },
};

const levelCardLabels = [
  'Listening',
  'Speaking',
  'Reading',
  'Writing',
] as const;

const circleTheme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: 'gray', // Custom color for the active step
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
  const handleChange = (event: SelectChangeEvent<ButtonLabel>) => {
    setActiveButton(event.target.value as ButtonLabel);
  };
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const currentPlan = plans[activeButton];
  const currentChallenges = currentPlan.challenges.map(
    challenge => challenge.challengeId,
  );

  const calculateScore = (plan: Plan) => {
    const totalChallenges = plan.challenges.length;
    const completedChallenges = plan.challenges.filter(
      challenge => challenge.isCompleted,
    ).length;
    return totalChallenges > 0 ? completedChallenges / totalChallenges : 0;
  };

  return (
    <main className="flex flex-col items-center gap-y-16">
      <div className="w-full md:w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">
          Study Plan
        </h1>
      </div>
      <div className="hidden md:flex w-1/2 justify-between">
        {buttonLabels.map(button => (
          <ThemeProvider theme={buttonsTheme} key={button}>
            <Button
              variant={activeButton === button ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleClick(button)}
            >
              <h1 className="font-semibold">{button}</h1>
            </Button>
          </ThemeProvider>
        ))}
      </div>
      <div className="md:hidden w-3/4">
        <ThemeProvider theme={buttonsTheme}>
          <FormControl fullWidth>
            <InputLabel id="plan-select-label">Select Plan</InputLabel>
            <Select
              labelId="plan-select-label"
              id="plan-select"
              value={activeButton}
              label="Select Plan"
              onChange={handleChange}
            >
              {buttonLabels.map(button => (
                <MenuItem key={button} value={button}>
                  {button}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
      {currentChallenges.length === 0 ? (
        <div className="w-3/4 border-2 rounded-lg min-h-28 flex flex-col items-center justify-center gap-y-5 md:w-1/2">
          <h1 className="font-semibold text-xl text-center">
            You need to take Initial Test!
          </h1>
          <ThemeProvider theme={buttonsTheme}>
            <Link to="/PlacementTest">
              <Button variant="contained" color="primary">
                Take Test
              </Button>
            </Link>
          </ThemeProvider>
        </div>
      ) : (
        <div className="w-3/4 border-2 rounded-lg min-h-28 flex justify-center items-center md:w-1/2">
          <div className="w-full overflow-x-auto min-h-28">
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
                        fontSize: '2rem', // Adjust circle size
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
      <div className="w-3/4 m-10 md:w-1/2">
        {buttonLabels.map(button =>
          entryTitle(button, calculateScore(plans[button])),
        )}
      </div>
      <div className="w-full md:w-3/4">
        <h1 className="text-4xl font-bold underline underline-offset-[14px] decoration-4 decoration-blue-4">
          What is it ?
        </h1>
      </div>
      <div className="flex flex-wrap w-full md:w-3/4 justify-center gap-16 max-md:flex-col">
        {levelCardLabels.map(button => {
          const plan = plans[button];
          const level = plan.challenges.length > 0 ? plan.level : '--';
          const description =
            plan.challenges.length > 0
              ? sectionDescriptions[button][plan.level]
              : '';
          return LevelCard(button, level, description);
        })}
      </div>
    </main>
  );
};

export default Exercises;

const entryTitle = (title: string, score: number) => (
  <>
    <div className="flex items-center justify-between max-md:flex-col max-md:items-start w-full">
      <span className="font-semibold max-md:mb-2">{title}</span>
      {/* <div className="w-1/2 bg-blue-1 h-full"></div> */}
      <div className="bg-blue-1 flex w-1/2 max-md:w-full rounded-xl">
        <div
          className="bg-blue-4 inline-block h-4 rounded-xl"
          style={{ width: (score * 100).toFixed(2) + '%' }}
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
  <div className="flex flex-col md:flex-row items-center border-2 border-gray-200 p-4 rounded-lg bg-white shadow-md w-full md:w-1/3 mb-4 md:mb-0">
    <div className="flex-shrink-0 mb-4 md:mb-0">
      <div className="flex items-center justify-center w-12 h-12 md:w-12 md:h-12 rounded-full border-2 border-gray-200">
        <img
          src={`assets/Sections/${icon}.png`}
          alt={icon}
          className="w-8 h-8"
        />
      </div>
    </div>
    <div className="flex flex-col items-center md:items-start flex-grow ml-0 md:ml-4">
      <div className="text-2xl md:text-4xl font-bold text-gray-800">
        {level}
      </div>
      <div className="text-sm md:text-base text-gray-500 mt-1 text-center md:text-left max-w-full">
        {description}
      </div>
    </div>
  </div>
);
