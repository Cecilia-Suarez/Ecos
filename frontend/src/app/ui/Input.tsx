import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Input = ({ className = "", startIcon, endIcon, ...props }: InputProps) => {
  return (
    <div
      className={`border-ecos-blue text-ecos-blue placeholder-ecos-blue flex h-[3.5rem] w-[22.563rem] items-center rounded-[1.75rem] border px-[1.875rem] py-2 md:h-[3rem] md:w-[38rem] xl:w-[72.563rem] ${className}`}
    >
      {startIcon}
      <input {...props} className={`w-full focus:outline-none ${className}`} />
      {endIcon}
    </div>
  );
};

export default Input;
