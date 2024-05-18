export const ProgressBar = ({ percentage = 0, isAnimated = false }) => {
  const width = (percentage * 100).toFixed(2) + '%';

  return (
    <div className="bg-blue-1 flex rounded-xl">
      <div
        className={`bg-blue-4 inline-block h-4 rounded-xl ${
          isAnimated ? 'transition-all duration-500' : ''
        }`}
        style={{ minWidth: width }}
      ></div>
    </div>
  );
};
