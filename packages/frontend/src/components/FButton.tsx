const Button = ({ label }: { label: string }) => {
    return (
      <button className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  
                        bg-[#575553] text-white border-[#575553]">
        {label}
      </button>
    )
  }
  
  export default Button;