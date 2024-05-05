const Button = ({ label, tag }: { label: string; tag: string }) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 font-montserrat text-lg leading-none bg-[#${tag}] rounded-full font-bold font-semi w-1/2`}
    >
      <p className="text-white max-sm:text-sm">{label}</p>
    </button>
  );
};

export default Button;
