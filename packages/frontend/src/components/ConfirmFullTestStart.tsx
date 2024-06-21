import { MouseEventHandler } from 'react';

interface ConfirmFullTestStartProps {
  onConfirm: MouseEventHandler;
}

export const ConfirmFullTestStart: React.FC<ConfirmFullTestStartProps> = ({
  onConfirm,
}) => {
  return (
    <div className="top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 z-50  text-justify">
      <div className="p-2 rounded w-90 h-100">
        <h2 className="lg:text-2xl md:text-2xl text-xl font-bold mb-4 ">IELTS Exam Instructions</h2>
        <p className="mb-4">
          The IELTS exam consists of four sections. Please read the instructions
          carefully before starting the exam.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Listening Section</h3>
          <p className="text-left">
            <span className="font-semibold">Total time:</span> approximately 30
            minutes (including review time).
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Reading Section</h3>
          <p className="text-left">
            <span className="font-semibold">Total time:</span> 60 minutes.
          </p>
          <p className="text-left">
            Allocate approximately 20 minutes for each passage.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Writing Section</h3>
          <p className="text-left">
            <span className="font-semibold">Total time:</span> 60 minutes.
          </p>
          <p className="text-left">
            Allocate approximately 20 minutes for Task 1 and 40 minutes for Task
            2.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Speaking Section</h3>
          <p className="text-left">
            <span className="font-semibold">Total duration:</span> approximately
            11-14 minutes.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between">
          <h3 className="text-lg font-bold mb-4 md:mb-0 inline mr-4">
            Are you sure you want to start?
          </h3>
          <button
            className="bg-blue-3 hover:bg-blue-4 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};
