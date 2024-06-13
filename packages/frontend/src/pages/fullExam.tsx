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
  list: previousTestsList | undefined;
  type: testType | 'full'; // remove optional parameter
}) => {
  if (!list) {
    list = {
      inProgress: '',
      previous: [],
    };
  }

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
          <h3 className="text-4xl font-bold">No {type} test in progress</h3>
        )}
      </section>

      <section className="h-1/2">
        <PastTests previousTests={list.previous} />
      </section>
    </>
  );
};

export default fullExam;
