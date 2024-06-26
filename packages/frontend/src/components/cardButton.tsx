import React from 'react';
import { Link, To } from 'react-router-dom';

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  size?: 'small' | 'large';
  noBackground?: boolean;
  to?: To;
};

const CardButton: React.FC<buttonProps> = ({
  label,
  size,
  noBackground,
  to,
  ...props
}: buttonProps) => {
  const baseClasses =
    'font-semibold rounded-full bg-blue-3 whitespace-nowrap hover:bg-blue-4 focus:outline-none transition duration-300';
  const sizeClasses =
    size === 'large'
      ? 'lg:text-lg lg:px-4 lg:py-2 text-sm px-4 py-2 bg-blue-4 rounded-lg hover:bg-blue-3'
      : 'text-sm px-4 py-2';
  const backgroundClasses = noBackground
    ? 'bg-transparent border border-blue-4 text-[#3B828E] rounded-lg hover:text-white'
    : 'bg-[#3B828E] text-white';

  const button = (
    <button
      {...props}
      className={`${baseClasses} ${sizeClasses} ${backgroundClasses}`}
    >
      <p>{label}</p>
    </button>
  );

  return to ? <Link to={to}>{button}</Link> : button;
};

export default CardButton;
