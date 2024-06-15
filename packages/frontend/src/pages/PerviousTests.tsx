import { useState } from 'react';
import {
  previousTestsListsFrontend,
  testType,
} from '../../../functions/src/utilities/fullTestUtilities';
import FullExam from './fullExam';
import { Button } from '../components/Button';

export const PreviousTests = ({
  type = 'full',
}: {
  type?: 'section' | 'full';
}) => {
  const previousTestsLists: previousTestsListsFrontend = {
    PK: 'my uid',
    SK: 'Tests',
    full: {
      inProgress: {
        testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
        progress: 25,
      },
      previous: [
        {
          score: 6,
          testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
        },
        {
          score: 8,
          testId: '1718026141537-c73c456c-13c8-47c3-8041-73dcad97390a',
        },
        {
          score: 3,
          testId: '1718088630445-12d5e02f-6e45-44c6-8a10-2a219014b0d7',
        },
        {
          score: 0,
          testId: '1718097841094-d099c101-2205-4e67-988f-ffd24d744ed6',
        },
      ],
    },
    writing: {
      inProgress: {
        testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
        progress: 50,
      },
      previous: [
        {
          score: 6,
          testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
        },
        {
          score: 8,
          testId: '1718026141537-c73c456c-13c8-47c3-8041-73dcad97390a',
        },
        {
          score: 3,
          testId: '1718088630445-12d5e02f-6e45-44c6-8a10-2a219014b0d7',
        },
        {
          score: 0,
          testId: '1718097841094-d099c101-2205-4e67-988f-ffd24d744ed6',
        },
      ],
    },
    speaking: {
      inProgress: {
        testId: '',
      },
      previous: [
        {
          score: 6,
          testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
        },
        {
          score: 8,
          testId: '1718026141537-c73c456c-13c8-47c3-8041-73dcad97390a',
        },
        {
          score: 3,
          testId: '1718088630445-12d5e02f-6e45-44c6-8a10-2a219014b0d7',
        },
        {
          score: 0,
          testId: '1718097841094-d099c101-2205-4e67-988f-ffd24d744ed6',
        },
      ],
    },
    listening: {
      inProgress: { testId: '' },
      previous: [],
    },
    reading: {
      inProgress: {
        testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
        progress: 75,
      },
      previous: [],
    },
  };

  if (type === 'full') {
    return <FullExam list={previousTestsLists.full} type="full" />;
  }

  const [selected, setSelected] = useState<testType>('reading');

  return (
    <>
      <div>
        <Button onClick={() => setSelected('reading')}>Reading</Button>
        <Button onClick={() => setSelected('listening')}>Listening</Button>
        <Button onClick={() => setSelected('writing')}>Writing</Button>
        <Button onClick={() => setSelected('speaking')}>Speaking</Button>
      </div>
      <FullExam list={previousTestsLists[selected]} type={selected} />
    </>
  );
};
