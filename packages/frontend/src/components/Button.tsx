import { Link, To } from 'react-router-dom';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isTransparent?: boolean;
  NoBackground?: boolean;
  isActive?: boolean;
  to?: To;
};

export const Button: React.FC<ButtonProps> = ({
  isTransparent = false,
  NoBackground = false,
  isActive = false,
  to,
  ...props
}) => {
  const style = NoBackground
    ? 'text-black bg-transparent border border-black hover:bg-blue-3 hover:text-white hover:border-blue-3'
    : isTransparent
    ? 'text-black bg-gray-1 bg-opacity-50 hover:bg-blue-1 ring-1 ring-inset ring-gray-400'
    : 'text-white bg-blue-3 hover:bg-blue-4';

  const activeStyle = isActive ? 'bg-blue-300 text-white border-blue-3' : '';
  /*for some reason the blue-3 does not work , kept is as blue-300 for now should be modified */

  const button = (
    <button
      {...props}
      type="button"
      className={`inline-flex w-full justify-center rounded-md px-3
        py-2 text-sm font-semibold shadow-sm 
        transition-colors duration-200 sm:ml-3 sm:w-auto ${style} ${activeStyle}`}
    ></button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
};
