import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  CircularProgressbarDefaultProps,
  CircularProgressbarStyles,
} from 'react-circular-progressbar/dist/types';
// IMPORTANT!!
import 'react-circular-progressbar/dist/styles.css';

type DoubleCirclesProps = {
  leftCircleProps: _CircularProgressbarProps;
  rightCircleProps: _CircularProgressbarProps;
};
type _CircularProgressbarProps = Partial<CircularProgressbarDefaultProps> & {
  value: number;
};

/* Circular Progress */
const cpStyles: CircularProgressbarStyles = {
  // Customize the root svg element
  root: {},
  // Customize the path, i.e. the "completed progress"
  path: {
    stroke: '#3B828E',
    strokeWidth: 8,
  },
  // Customize the circle behind the path, i.e. the "total progress"
  trail: {
    // Trail color
    stroke: '#AAD7D9',
    strokeWidth: 8,
  },
  // Customize the text
  text: {
    // Text size
    fontSize: '0.95rem',
  },
};

export const DoubleCircles: React.FC<DoubleCirclesProps> = ({
  rightCircleProps,
  leftCircleProps,
}) => {
  return (
    <div className="flex justify-evenly mb-20">
      <div className="w-1/6 max-md:w-1/3">
        <p className="text-center mb-6">Band Score</p>
        <CircularProgressbar {...leftCircleProps} styles={cpStyles} />
      </div>
      <div className="w-1/6 max-md:w-1/3">
        <p className="text-center mb-6">Total Score</p>
        <CircularProgressbar {...rightCircleProps} styles={cpStyles} />
      </div>
    </div>
  );
};
