import { WritingSection } from '../utilities';
import { PointsBadge } from './PointsBadge';
export function WritingQuestion({
  task,
}: {
  task: WritingSection['task1'] | WritingSection['task2'];
}) {
  const image =
    'graphUrl' in task ? (
      <div className="flex flex-row justify-center my-12 mx-4">
        <img
          className="shadow-xl md:max-w-[50%] xl:max-w-[33%]"
          src={task.graphUrl}
          alt=""
        />
      </div>
    ) : (
      <></>
    );
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl text-blue-4 font-bold text-center mb-12">
        Writing {'graphUrl' in task ? '1' : '2'}
      </h1>

      <section id="question" className="mb-12">
        <h2 className="font-bold mb-4">Question:</h2>
        <p className="whitespace-pre-line ml-4 mb-6">{task.question}</p>
        {image}
        <div className="flex flex-row-reverse">
          <PointsBadge points={10} />
        </div>
      </section>
    </div>
  );
}
