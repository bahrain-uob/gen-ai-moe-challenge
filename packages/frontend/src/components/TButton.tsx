const Button = ({ label }: { label: string }) => {
  return (
    <button
      className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-transparent rounded-full font-bold
                      text-[#726F6C] border-[#575553] font-semi"
    >
      {label}
    </button>
  );
};

export default Button;
