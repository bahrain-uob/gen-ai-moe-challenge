const CircularProgressBar = ({
  radius,
  percentage,
  circleWidth,
  percentageFontSize = '0.5rem',
}: {
  radius:number;
  percentage: number;
  circleWidth: number;
  percentageFontSize?: string;
  
}) => {

  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className={`w-[${circleWidth}px] h-[${circleWidth}px]`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="3"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
        />
        <circle
          className="text-[#3B828E] progress-ring__circle stroke-current"
          strokeWidth="3"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
        <text
          x="50"
          y="50"
          fontFamily="Verdana"
          textAnchor="middle"
          alignmentBaseline="middle"
          className=" font-Inter  "
          style={{ fontSize: percentageFontSize }}
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
