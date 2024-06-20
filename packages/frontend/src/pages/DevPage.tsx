import { setCachedFeedback } from '../utilities';
import { sampleFullTest } from '../utilities/sampleFullTest';
import { Button } from '../components/Button';

export const DevPage = () => {
  const containerStyle = 'flex flex-wrap gap-3 mb-3';

  return (
    <>
      {/* <h4 className="text-xl mb-4"> Better pages </h4>
    <div className="flex">
      <Button to="/_writing-task1">Writing Task 1</Button>
      <Button to="/_writing-task2">Writing Task 2</Button>
    </div>
    <h4 className="text-xl mb-4"> Dummy pages </h4> */}
      <div className={containerStyle}>
        <Button to="/listening/1">Listening</Button>
        <Button to="/reading/2">Reading</Button>
        <Button to="/speaking">Speaking</Button>
      </div>
      <div className={containerStyle}>
        <Button to="/test-speaking-audio-ui">Speaking Audio UI</Button>
        <Button to="/test-speaking-card-ui">Speaking Card UI</Button>
      </div>
      <div className={containerStyle}>
        <Button to="/test">/test</Button>
        <Button to="/full-test">full test</Button>
        <Button
          to="/feedback/1717941628284-sample"
          onClick={() =>
            setCachedFeedback(
              { fullItem: sampleFullTest },
              '1717941628284-sample',
            )
          }
        >
          Sample Feedback
        </Button>
        <Button to="/challengePage">Sample Challenge</Button>
      </div>
    </>
  );
};
