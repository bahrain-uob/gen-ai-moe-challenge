const cardButton = ({ label }: { label: string }) => {
    return (
      <button
        className={`bg-[#3B828E] text-white font-bold text-sm px-5 py-3 rounded-full shadow-md focus:outline-none transition duration-300`}
      >
        <p className="text-white max-sm:text-sm">{label}</p>
      </button>
    );
  };
  
  export default cardButton;
  