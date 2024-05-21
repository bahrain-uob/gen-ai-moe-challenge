import {} from './Spinner.css';

export const Spinner = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center">
        <div className="lds-ring mr-3">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
};
