import {
  previousTestsListFrontend,
  testType,
} from '../../../functions/src/utilities/fullTestUtilities';
import Card from '../sections/currentExamCard';
import PastTests from '../sections/pastTests';
import { getRelativeTime } from '../utilities';

const fullExam = ({
  list,
  type = 'full',
}: {
  list: previousTestsListFrontend | undefined;
  type: testType | 'full'; // remove optional parameter
}) => {
  if (!list) {
    list = {
      inProgress: { testId: '' },
      previous: [],
    };
  }

  return (
    <>
      <section className="w-full h-4/6 flex justify-center my-8">
        {list.inProgress.testId && list.inProgress.progress ? (
          <Card
            title={
              'IELTS - ' +
              type.charAt(0).toUpperCase() +
              type.slice(1) +
              ' Test'
            }
            startDate={getRelativeTime(list.inProgress.testId)}
            progress={list.inProgress.progress}
            testId={list.inProgress.testId}
          />
        ) : (
          <h3 className="text-4xl font-bold">No {type} test in progress</h3>
        )}
      </section>

      <section className="h-1/2">
        <PastTests previousTests={list.previous} type={type} />
      </section>
    </>
  );
};

export default fullExam;
