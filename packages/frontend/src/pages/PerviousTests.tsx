import { useEffect, useState } from 'react';
import {
  previousTestsListsFrontend,
  testType,
} from '../../../functions/src/utilities/fullTestUtilities';
import FullExam from './fullExam';
import { Button } from '../components/Button';
import { get } from 'aws-amplify/api';
import { toJSON } from '../utilities';
import { Spinner } from '../components/Spinner';
import { BsFillPencilFill,BsHeadphones,BsMic,BsBook } from 'react-icons/bs';

export const PreviousTests = ({
  type = 'full',
}: {
  type?: 'section' | 'full';
}) => {
  const [previousTests, setPreviousTests] =
    useState<previousTestsListsFrontend>();
  const [error, setError] = useState();

  const [selected, setSelected] = useState<testType>('reading');

  useEffect(() => {
    toJSON(
      get({
        apiName: 'myAPI',
        path: '/previousTest',
      }),
    )
      .then(response => {
        setPreviousTests(response);
        console.log(response);
      })
      .catch(err => {
        setError(err);
        console.log('catched error', err);
      });
  }, []);

  // if (!previousTests)
  //   setPreviousTests({
  //     PK: 'my uid',
  //     SK: 'Tests',
  //     full: {
  //       inProgress: {
  //         testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
  //         progress: 25,
  //       },
  //       previous: [
  //         {
  //           score: 6,
  //           testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
  //         },
  //         {
  //           score: 8,
  //           testId: '1718026141537-c73c456c-13c8-47c3-8041-73dcad97390a',
  //         },
  //         {
  //           score: 3,
  //           testId: '1718088630445-12d5e02f-6e45-44c6-8a10-2a219014b0d7',
  //         },
  //         {
  //           score: 0,
  //           testId: '1718097841094-d099c101-2205-4e67-988f-ffd24d744ed6',
  //         },
  //       ],
  //     },
  //     writing: {
  //       inProgress: {
  //         testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
  //         progress: 50,
  //       },
  //       previous: [
  //         {
  //           score: 6,
  //           testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
  //         },
  //         {
  //           score: 8,
  //           testId: '1718026141537-c73c456c-13c8-47c3-8041-73dcad97390a',
  //         },
  //         {
  //           score: 3,
  //           testId: '1718088630445-12d5e02f-6e45-44c6-8a10-2a219014b0d7',
  //         },
  //         {
  //           score: 0,
  //           testId: '1718097841094-d099c101-2205-4e67-988f-ffd24d744ed6',
  //         },
  //       ],
  //     },
  //     speaking: {
  //       inProgress: {
  //         testId: '',
  //       },
  //       previous: [
  //         {
  //           score: 6,
  //           testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
  //         },
  //         {
  //           score: 8,
  //           testId: '1718026141537-c73c456c-13c8-47c3-8041-73dcad97390a',
  //         },
  //         {
  //           score: 3,
  //           testId: '1718088630445-12d5e02f-6e45-44c6-8a10-2a219014b0d7',
  //         },
  //         {
  //           score: 0,
  //           testId: '1718097841094-d099c101-2205-4e67-988f-ffd24d744ed6',
  //         },
  //       ],
  //     },
  //     listening: {
  //       inProgress: { testId: '' },
  //       previous: [],
  //     },
  //     reading: {
  //       inProgress: {
  //         testId: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
  //         progress: 75,
  //       },
  //       previous: [],
  //     },
  //   });

  if (error) {
    return <h3>{`${error}`}</h3>;
  }

  if (!previousTests) {
    return <Spinner message={'Loading your previous tests'} />;
  }

  if (type === 'full') {
    return <FullExam list={previousTests.full} type="full" />;
  }

  return (
    <>
      <div className='flex justify-center space-x-8'>
        <Button onClick={() => setSelected('reading')} NoBackground>
            <div className="flex items-center space-x-2">
            <BsBook />
            <span>Reading</span>
            </div>
        </Button>
        <Button onClick={() => setSelected('listening')} NoBackground>
            <div className="flex items-center space-x-2">
            <BsHeadphones />
            <span>Listening</span>
            </div>
        
       </Button>
        <Button onClick={() => setSelected('writing')} NoBackground>
        
        <div className="flex items-center space-x-2">
        <BsFillPencilFill />
         <span>Writing</span>
        </div>
        </Button>
        <Button onClick={() => setSelected('speaking')} NoBackground>
          
         <div className="flex items-center space-x-2">
          <BsMic />
          <span>Speaking</span>
          </div>
        </Button>
      </div>
      <FullExam list={previousTests[selected]} type={selected} />
    </>
  );
};
