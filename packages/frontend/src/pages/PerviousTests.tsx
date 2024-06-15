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
      <div>
        <Button onClick={() => setSelected('reading')}>Reading</Button>
        <Button onClick={() => setSelected('listening')}>Listening</Button>
        <Button onClick={() => setSelected('writing')}>Writing</Button>
        <Button onClick={() => setSelected('speaking')}>Speaking</Button>
      </div>
      <FullExam list={previousTests[selected]} type={selected} />
    </>
  );
};
