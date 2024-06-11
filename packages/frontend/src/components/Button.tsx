import { Link, To } from 'react-router-dom';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isTransparent?: boolean;
  to?: To;
};

export const Button: React.FC<ButtonProps> = ({
  isTransparent = false,
  to,
  ...props
}) => {
  const style = isTransparent
    ? 'text-black bg-gray-1 bg-opacity-50 hover:bg-blue-1 ring-1 ring-inset ring-gray-400'
    : 'text-white bg-blue-3 hover:bg-blue-4';

  const button = (
    <button
      {...props}
      type="button"
      className={`inline-flex w-full justify-center rounded-md px-3
        py-2 text-sm font-semibold shadow-sm 
        transition-colors duration-200 sm:ml-3 sm:w-auto ${style}`}
    ></button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
};
