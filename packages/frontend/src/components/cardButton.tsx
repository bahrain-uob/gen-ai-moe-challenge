const CardButton = ({
    label,
    size,
    noBackground,
  }: {
    label: string;
    size?: 'small' | 'large';
    noBackground?: boolean;
  }) => {
    const baseClasses = "font-semibold rounded-full bg-blue-3 whitespace-nowrap hover:bg-blue-4 focus:outline-none transition duration-300";
    const sizeClasses = size === 'large' 
      ? 'lg:text-lg lg:px-4 lg:py-2 text-sm px-4 py-2 bg-blue-4 rounded-lg hover:bg-blue-3' 
      : 'text-sm px-4 py-2';
    const backgroundClasses = noBackground 
      ? 'bg-transparent border border-blue-4 text-[#3B828E] rounded-lg hover:text-white' 
      : 'bg-[#3B828E] text-white';
  
    return (
      <button className={`${baseClasses} ${sizeClasses} ${backgroundClasses}`}>
        <p>{label}</p>
      </button>
    );
  };
  
  export default CardButton;
  