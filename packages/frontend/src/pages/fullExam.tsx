import {
  previousTestsList,
  testType,
} from '../../../functions/src/utilities/fullTestUtilities';
import Card from '../sections/currentExamCard';
import PastTests from '../sections/pastTests';
import { getRelativeTime } from '../utilities';

const fullExam = ({
  list,
  type = 'full',
}: {
  list?: previousTestsList;
  type: testType | 'full';
}) => {
  list = {
    inProgress: '1718023891366-41bbe8b1-38e5-40bf-8d85-14c0ca40b1b1',
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
  };

  return (
    <>
      <section className="w-full h-4/6 flex justify-center my-8">
        {list.inProgress ? (
          <Card
            title={
              'IELTS - ' +
              type.charAt(0).toUpperCase() +
              type.slice(1) +
              ' Test'
            }
            // remTime="34 : 21"
            startDate={getRelativeTime(list.inProgress)}
            // timing="Remaining Time"
          />
        ) : (
          <h3 className="text-4xl font-bold">No test in progress</h3>
        )}
      </section>

      <section className="h-1/2">
        <PastTests previousTests={list.previous} />
      </section>
    </>
  );
};

export default fullExam;
