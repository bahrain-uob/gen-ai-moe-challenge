const cardButton = ({ label }: { label: string }) => {
    return (
      <button
        className={`bg-[#3B828E] text-white text-sm px-4 py-2 rounded-full  focus:outline-none transition duration-300`}
      >
        <p className="text-white max-sm:text-sm">{label}</p>
      </button>
    );
  };
  
  export default cardButton;
  