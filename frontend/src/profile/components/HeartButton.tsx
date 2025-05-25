import { ComponentProps } from "react";
import { Heart } from "./ui/Icons";

type HeartButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
  isSaved: boolean;
};

export const HeartButton = ({ children, isSaved, ...buttonProps }: HeartButtonProps) => {
  return (
    <button type="button" {...buttonProps}>
      <Heart
        className={`transition-transform duration-300 ${
          isSaved ? "animate-pop fill-red-500" : "fill-none"
        }`}
      />
      {children}
    </button>
  );
};
