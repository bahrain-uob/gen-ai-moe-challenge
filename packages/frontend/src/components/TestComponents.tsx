import { MouseEventHandler } from 'react';
import { BsArrowLeft, BsCheckLg, BsFloppy2 } from 'react-icons/bs';

type TitleRowProps = {
  title: string;
  onSubmit?: MouseEventHandler;
  onSave?: MouseEventHandler;
  onBack?: MouseEventHandler;
};

export const TitleRow: React.FC<TitleRowProps> = ({
  title,
  onSubmit,
  onSave,
  onBack,
}) => {
  return (
    <div className="w-full h-full flex items-center border-b-2">
      <div className="w-1/3 h-full nav-item">
        {onBack && <BackButton onBack={onBack} />}
      </div>
      <div className="w-1/3 text-center font-light text-xl">{title}</div>
      <div className="w-1/3 nav-item flex-row justify-end">
        <button onClick={onSave} className="mr-2">
          Save <BsFloppy2 className="inline max-sm:hidden mr-4" />
        </button>
        <button onClick={onSubmit}>
          Submit <BsCheckLg className="inline max-sm:hidden" />
        </button>
      </div>
    </div>
  );
};

type BackButtonProps = {
  onBack?: MouseEventHandler;
};

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button onClick={onBack} className="hover:text-gray-700">
      <BsArrowLeft className="inline mr-2" />
      <span>Back</span>
    </button>
  );
};
