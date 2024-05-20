import { MouseEventHandler } from 'react';
import { BsArrowLeft, BsCheckLg } from 'react-icons/bs';

type TitleRowProps = {
  title: string;
  onSubmit?: MouseEventHandler;
};

export const TitleRow: React.FC<TitleRowProps> = ({ title, onSubmit }) => {
  return (
    <div className="w-full h-full flex items-center border-b-2">
      <div className="w-1/3 h-full nav-item">
        <button className="hover:text-gray-700">
          <BsArrowLeft className="inline mr-2" />
          <span>Back</span>
        </button>
      </div>
      <div className="w-1/3 text-center font-light text-xl">{title}</div>
      <div className="w-1/3 nav-item flex-row-reverse">
        <button onClick={onSubmit}>
          Submit <BsCheckLg className="inline" />
        </button>
      </div>
    </div>
  );
};
