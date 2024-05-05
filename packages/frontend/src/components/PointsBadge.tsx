export const PointsBadge = ({ points }: { points: number }) => (
  <span className="bg-white text-blue-4 px-12 py-1 rounded-full shadow-md select-none">
    {points.toFixed(0)} points
  </span>
);
