const Button = ({ label, tag }: { label: string; tag: string }) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-[#${tag}] rounded-full font-bold font-semi max-sm:py-3 max-sm:px-6`}
    >
      <p className="text-white max-sm:text-sm">{label}</p>
    </button>
  );
};

export default Button;
